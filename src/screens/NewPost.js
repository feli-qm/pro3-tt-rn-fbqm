import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth, db } from '../firebase/config';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            descripcion: ''
        };
    }

    handleSubmit(descripcion) {
        db.collection('posts')
            .add({
                email: auth.currentUser.email,
                descripcion: descripcion,
                createdAt: Date.now(),
                likes: []
            })
            .then(() => {
                this.setState({ registered: true, errorMsg: "" });
                this.props.navigation.navigate("Home");
            })
            .catch((e) => console.log(e.message))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo}
                        source={require('../../assets/parfume-sinfondo.png')}
                        resizeMode='contain'
                    />
                </View>

                <Text style={styles.title}>Nuevo Post</Text>
                <Text style={styles.subtitle}>Ingrese los datos del post</Text>

                <View style={styles.userContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Breve descripción'
                        onChangeText={text => this.setState({ descripcion: text })}
                        value={this.state.descripcion}
                        multiline={true}
                        numberofLines={4}
                    />

                    <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state.descripcion)}>
                        <Text style={styles.buttonText}> Crear post </Text>
                    </TouchableOpacity>

                    {this.state.errorMsg && <Text>{this.state.errorMsg}</Text>}

                </View>


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
    userContainer: {
        backgroundColor: '#fff',
        borderRadius: 14,
        marginBottom: 22,
        padding: 14,
        shadowColor: '#004',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
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
    input: {
        height: 50,
        width: '100%',
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#dfb084',
        borderRadius: 8,
        backgroundColor: '#f2c2b8',
        marginBottom: 15,
        marginTop: 5,
        color: '#703f30',
    },
    button: {
        backgroundColor: '#cd933f',
        paddingVertical: 5,
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    errorMsg: {
        color: '#D32F2F',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
});