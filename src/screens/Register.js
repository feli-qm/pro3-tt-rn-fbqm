import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Register extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <Text style={styles.description}>
                    Esta es la pantalla donde debe ir el formulario de registro.
                </Text>
                <Text style={styles.description}>
                    Navegación cruzada a Login:
                </Text>

                <TouchableOpacity
                    style={styles.buttonBlue}
                    onPress={() => this.props.navigation.navigate('Login')}
                >
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
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6f4e37',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#8f8f8f',
    },
    buttonBlue: {
        backgroundColor: '#67b7f7',
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});