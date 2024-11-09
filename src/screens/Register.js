import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      registered: false,
      errorMsg: "",
      buttonOff: true,
    };
  }

  handleValidate = () => {
    const {email, userName, password} = this.state;

    if (email === ''){
        return "El campo de email es obligatorio.";
    }
    if (userName === ''){
        return "El campo de usuario es obligatorio.";
    }
    if (password === ''){
        return "El campo de contrasena es obligatorio.";
    }

    return null;

  }

  handleSubmit(email, pass, userName) {

    const errorMsg = this.handleValidate();
    if (errorMsg) {
        this.setState({errorMsg});
        return;
    }
    auth.
      createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        //Vamos a agregar el usuario a la collection users
        if (response) {
          db.collection('users')
            .add({
              email: email,
              userName: userName,
              createdAt: Date.now()
            })
            .then(() => {
              //redireccionar a login
              this.setState({ registered: true, errorMsg: "" });
              this.props.navigation.navigate("Login");
        })
            .catch((e) => console.log(e.message));
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ errorMsg: error.message });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Ingrese su usuario'
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.userName} />

        <TextInput style={styles.input}
          keyboardType='email-address'
          placeholder='Ingrese su email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Ingrese su contrasena'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state.email, this.state.password, this.state.userName)}>
          <Text style={styles.buttonText}> Registrar </Text>
        </TouchableOpacity>

        {this.state.errorMsg && <Text>{this.state.errorMsg}</Text>}

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    marginTop: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10
  },
  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  preview: {
    marginTop: 30,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  }
});