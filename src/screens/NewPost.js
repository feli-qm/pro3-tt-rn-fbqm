import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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

    handleSubmit(email, imagen, descripcion) {
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    preview: {
        marginTop: 30,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#f9f9f9',
    }
});