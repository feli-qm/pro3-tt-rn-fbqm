import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth, db } from '../firebase/config';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imagen: '',
            descripcion: ''
        };
    }

    handleSubmit(imagen, descripcion) {
        db.collection('posts')
            .add({
                email: auth.currentUser.email,
                imagen: imagen,
                descripcion: descripcion,
                createdAt: Date.now()
            })
            .then(() => {
                //redireccionar a login
                this.setState({ registered: true, errorMsg: "" });
                this.props.navigation.navigate("Home");
            })
            .catch((e) => console.log(e.message))

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Image style={styles.image}
                        source={require('../../assets/parfume.png')}
                        resizeMode='contain' />
                    <Text style={styles.title}>Nuevo post</Text>

                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholder='Ingrese su contenido del post'
                        onChangeText={text => this.setState({ descripcion: text })}
                        value={this.state.descripcion}
                        multiline={true}
                        numberofLines={4} />

                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholder='Ingrese su imagen'
                        onChangeText={text => this.setState({ imagen: text })}
                        value={this.state.imagen}
                        multiline={true}
                        numberofLines={4} />

                    <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state.email, this.state.descripcion, this.state.imagen)}>
                        <Text style={styles.buttonText}> Crear post </Text>
                    </TouchableOpacity>
                </View>

                {this.state.errorMsg && <Text>{this.state.errorMsg}</Text>}

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
        elevation: 3,
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
    errorMsg: {
        color: '#D32F2F',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
});