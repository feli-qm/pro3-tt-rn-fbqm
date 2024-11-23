import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
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
      isDisabled: true,
    };
  }
componentDidMount(){
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.props.navigation.navigate("HomeMenu");
    }
  });
}

handleDisabled = () => {
  if (this.state.email !== ""  && this.state.userName !== ""  && this.state.password !== "") {
    this.setState({
      isDisabled: false,
    }
  )} 
}

  handleValidate = () => {
    const { email, userName, password } = this.state;

    if (email === '') {
      return "El campo de email es obligatorio.";
    }
    if (userName === '') {
      return "El campo de usuario es obligatorio.";
    }
    if (password === '') {
      return "El campo de contrasena es obligatorio.";
    }

    return null;

  }

  handleSubmit(email, pass, userName) {

    const errorMsg = this.handleValidate();
    if (errorMsg) {
      this.setState({ errorMsg });
      return;
    }
    auth.
      createUserWithEmailAndPassword(email, pass)
      .then((response) => {
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
        <View style={styles.formContainer}>
          <Image style={styles.image}
            source={require('../../assets/parfume.png')}
            resizeMode='contain' />
          <Text style={styles.title}>Registro</Text>

          <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Ingrese su usuario'
            onChangeText={text => { 
              this.handleDisabled()
              this.setState({ userName: text })}}
            value={this.state.userName} />

          <TextInput style={styles.input}
            keyboardType='email-address'
            placeholder='Ingrese su email'
            onChangeText={text => {
              this.handleDisabled()
              this.setState({ email: text })}}
            value={this.state.email} />

          <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Ingrese su contrasena'
            secureTextEntry={true}
            onChangeText={text => {
              this.handleDisabled()
              this.setState({ password: text })}}
            value={this.state.password} />
            <Text>{this.state.errorMsg} </Text>
        </View>
        <TouchableOpacity 
          style={this.state.isDisabled ? [styles.button, styles.disabled] : styles.button } 
          onPress={() => this.handleSubmit(this.state.email, this.state.password, this.state.userName)} 
          disabled= {this.state.isDisabled}
        >
          <Text style={styles.buttonText}> Registrar </Text>
        </TouchableOpacity>

        {/*{this.state.errorMsg && <Text>{this.state.errorMsg}</Text>}*/}

        <TouchableOpacity
          style={styles.buttonRedirect}
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
    padding: 20,
    backgroundColor: '#291009',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    paddingVertical: 40,
    paddingHorizontal: 30,
    backgroundColor: '#fffaf9',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Playfair Display',
    fontWeight: 'bold',
    color: '#703f30',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Playfair Display',
    borderWidth: 1,
    borderColor: '#dfb084',
    borderRadius: 8,
    backgroundColor: '#f2c2b8',
    marginBottom: 20,
    color: '#703f30',
  },
  button: {
    backgroundColor: '#cd933f',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabled: {
    backgroundColor: 'grey',
  },
  buttonLink: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Playfair Display',
  },
  buttonRedirect: {
    backgroundColor: '#e1bee7',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  errorMsg: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});