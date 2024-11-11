import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-web';
import {db} from '../firebase/config';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            usuariosFiltrados: [],
            filterValue: '',
        };
    }
    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        usuarios: users
                    })
                })
            }
        )
    }

    userFilter(e) {
        const userValue = e.target.value;

        this.setState({
          filterValue: userValue,
          usuariosFiltrados: this.state.usuarios.filter(u => u.email.toLowerCase().includes(userValue.toLowerCase()))
        })
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Users</Text>

                    <Text style={styles.subtitle}>Search users</Text>
                    
                    <TextInput style={styles.input} 
                        keyboardType='email-address'
                        placeholder='filtre email'
                        onChangeText={(t) => this.userFilter(t)}
                        value={this.state.filterValue}
                    />

                    <FlatList
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.userItem}>
                                <Text>Email: {item.data.email}</Text>
                                <Text>Username: {item.data.userName}</Text>
                                <Text>Created At: {item.data.createdAt}</Text>
                            </View>
                        )}
                    />
                </View>
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
    subtitle: {
      fontSize: 20,
      fontFamily: 'Playfair Display',
      color: '#703f30',
      textAlign: 'center',
      margin: 10,
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