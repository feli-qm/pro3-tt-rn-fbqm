import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            errorMsg: '',
        };
    }

    componentDidMount() {
        const currentUser = auth.currentUser;
        if (currentUser) {
            this.setState({
                email: currentUser.email,
                userName: currentUser.userName,
            });
        }
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
                <Text style={styles.title}>Perfil</Text>
                <Text>Email: {this.state.email}</Text>
                <Text>User Name: {this.state.userName}</Text>

                {this.state.errorMsg ? (
                    <Text style={styles.error}>{this.state.errorMsg}</Text>
                ) : null}

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
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});
