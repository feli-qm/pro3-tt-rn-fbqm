import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      registered: false,
      errorMsg: ''
    };
  }

  handleValidate = () => {
    const {email, password} = this.state;
    if (email === ''){
        return "El campo de email es obligatorio.";
    }
    if (password === ''){
        return "El campo de contrasena es obligatorio.";
    }
    return null;
  }

  handleSubmit = (email, pass) => {
    const errorMsg = this.handleValidate();
    if (errorMsg) {
        this.setState({errorMsg});
        return;
    }
    
    auth.
    signInWithEmailAndPassword(email, pass)
    .then((response) => {this.setState({registered: true, errorMsg: ""})
    this.props.navigation.navigate('HomeMenu')})
    .catch((error)=> {
      console.log(error.message);
      this.setState({errorMsg: error.message});
    });
  };

  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('HomeMenu')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingresar</Text>

        <TextInput style={styles.input}
          keyboardType='email-address'
          placeholder= 'email'
          onChangeText={text=> this.setState({email: text})}
          value={this.state.email} />

        <TextInput style={styles.input}
          keyboardType= 'default'
          placeholder= 'password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text})}
          value={this.state.password} />

        <Text>{this.state.errorMsg} </Text>

        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state.email, this.state.password)}>
            <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

        <View style={styles.preview}>
            <Text>Email: {this.state.email}</Text>
            <Text>Password: {this.state.password}</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonBlue}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>No tengo cuenta</Text>
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
          buttonOrange: {
            backgroundColor: '#f7a667',
            padding: 15,
            marginTop: 20,
            borderRadius: 10,
            width: '100%',
            alignItems: 'center',
          },
          buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
          },
        });