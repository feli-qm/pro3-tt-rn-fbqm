import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import { FlatList } from 'react-native-web';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            errorMsg: '',
            userPosts: [],
        };
    }

    componentDidMount() {
        const currentUser = auth.currentUser;
        if (currentUser) {
            this.setState({
                email: currentUser.email,
                userName: currentUser.userName || 'Usuario',
            });
        }

        db.collection('posts').onSnapshot(
          docs => {
              let posts = [];
              docs.forEach(doc => {
                  posts.push({
                      id: doc.id,
                      data: doc.data()
                  })
                  this.setState({
                      userPosts: this.state.posts.filter(p => p.data.email.toLowerCase().includes(this.state.email.toLowerCase))
                  })
              })
          }
        )
    }

    handleLogout() {
        auth.signOut()
            .then(() => {
                console.log('Usuario deslogueado');
                this.props.navigation.navigate('Login');
            })
            .catch(error => {
                console.error('Error al desloguear:', error);
                this.setState({ errorMsg: 'Error al desloguear. Intenta de nuevo.' });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Image style={styles.image}
                        source={require('../../assets/parfume.png')}
                        resizeMode='contain' 
                    />

                    <Text style={styles.title}>Perfil</Text>
                    <Text style={styles.detail}>Email: {this.state.email}</Text>
                    <Text style={styles.detail}>User Name: {this.state.userName}</Text>

                    {this.state.errorMsg ? (
                        <Text style={styles.error}>{this.state.errorMsg}</Text>
                    ) : null}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
                  <Text style={styles.buttonText}>Logout</Text>
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
      elevation: 5,
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
      marginBottom: 10,
    },
    detail: {
      fontSize: 20,
      fontFamily: 'Playfair Display',
      color: '#703f30',
      textAlign: 'center',
      margin: 10,
    },
    button: {
      backgroundColor: '#cd933f',
      paddingVertical: 10,
      width: '100%',
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
      elevation: 3,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: 'Playfair Display',
    },
    errorMsg: {
      color: '#D32F2F',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 10,
    },
    preview: {
      marginTop: 20,
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
    },
  });