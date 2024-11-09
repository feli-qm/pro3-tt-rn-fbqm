import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Ingresar</Text>
                <Text style={styles.description}>
                    Esta es la pantalla donde debe ir el formulario de login.
                </Text>
                <Text style={styles.description}>
                    Navegación cruzada a Register:
                </Text>

                <TouchableOpacity
                    style={styles.buttonBlue}
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>No tengo cuenta</Text>
                </TouchableOpacity>

                <Text style={styles.description}>
                    Navegación cruzada a ingresar a la app. Este paso se hará automáticamente cuando veamos la funcionalidad de login.
                </Text>

                <TouchableOpacity
                    style={styles.buttonOrange}
                    onPress={() => this.props.navigation.navigate('HomeMenu')}
                >
                    <Text style={styles.buttonText}>Entrar en la app.</Text>
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
        fontSize: 16,
    },
});