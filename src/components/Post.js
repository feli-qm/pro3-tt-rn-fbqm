import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false,
            cantidad: this.props.item.data.likes.length
        }
    }

    componentDidMount() {
        if (this.props.item.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
        }
    }

    handleLike() {
        db.collection('posts').doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => this.setState({
                like: true,
                cantidad: this.props.item.data.likes.length

            }))
    }

    handleUnlike() {
        db.collection('posts').doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => this.setState({
                like: false,
                cantidad: this.props.item.data.likes.length
            }))
    }

    render() {
        const { email, imagen, likes, descripcion } = this.props.item.data;
        return (
            <View style={styles.userInfo}>
                <Text styles={styles.autor}>Email: {email}</Text>
                <Text>Descripcion: {descripcion}</Text>
                {this.state.like ? (
                    <TouchableOpacity onPress={() => this.handleUnlike()}>
                        <Text>Ya no me gusta</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => this.handleLike()}>
                        <Text>Like</Text>
                    </TouchableOpacity>
                )}
                <Text>Cantidad de likes:  {this.state.cantidad} </Text>
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
    autor:{
        textAlign: "right"
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
    userInfo: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#dfb084',
        borderRadius: 8,
        backgroundColor: '#f2c2b8',
    },
});
