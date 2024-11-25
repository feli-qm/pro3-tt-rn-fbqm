import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { db } from '../firebase/config';

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
                    });
                });
                this.setState({
                    usuarios: users,
                    usuariosFiltrados: users
                });
            }
        );
    }

    userFilter = (text) => {
        this.setState({
            filterValue: text,
            usuariosFiltrados: this.state.usuarios.filter(u => u.data.email.toLowerCase().includes(text.toLowerCase())),
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo}
                        source={require('../../assets/parfume-sinfondo.png')}
                        resizeMode='contain'
                    />
                </View>
                
                <Text style={styles.title}>Users</Text>
                <Text style={styles.subtitle}>Search users</Text>

                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Filtrar email'
                    onChangeText={this.userFilter}
                    value={this.state.filterValue}
                />

                {this.state.usuariosFiltrados.length === 0 ? (
                    <Text>El email no existe</Text>
                ) : (
                    <FlatList
                        data={this.state.usuariosFiltrados}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                                <View style={styles.userContainer}>
                                    <Text style={styles.email}>Email: {item.data.email}</Text>
                                    <Text>Username: {item.data.userName}</Text>                            
                                </View>
                            )
                        }
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#703f30',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#703f30',
        margin: 10,
    },
    email: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#703f30',
    },
    input: {
      height: 50,
      width: '100%',
      paddingHorizontal: 20,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#dfb084',
      borderRadius: 8,
      backgroundColor: '#f2c2b8',
      marginBottom: 20,
      color: '#703f30',
    },
    userContainer: {
        backgroundColor: '#fff',
        borderRadius: 14,
        marginBottom: 22,
        padding: 14,
        shadowColor: '#004',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }
});
