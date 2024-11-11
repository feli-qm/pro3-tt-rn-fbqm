import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
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
            usuariosFiltrados: this.state.usuarios.filter(u =>
                u.data.email.toLowerCase().includes(text.toLowerCase())
            ),
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Users</Text>
                    <Text style={styles.subtitle}>Search users</Text>

                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        placeholder='Filtrar email'
                        onChangeText={this.userFilter}
                        value={this.state.filterValue}
                    />

                    <FlatList
                        data={this.state.usuariosFiltrados}
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
        alignItems: 'center',
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
        color: '#703f30',
        textAlign: 'center',
        margin: 10,
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
    userItem: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginVertical: 8,
        borderRadius: 8,
    },
});
