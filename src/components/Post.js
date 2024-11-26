import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { PiHeartStraightFill } from "react-icons/pi";
import { PiHeartStraightLight } from "react-icons/pi";
import { PiTrash } from "react-icons/pi";

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

    handleDelete() {
        db.collection('posts').doc(this.props.item.id).delete()
            .then(() => {
                console.log('Post eliminado');
            })
            .catch(error => console.error('Error eliminando post:', error));
    }

    formatDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    render() {
        const { email, descripcion } = this.props.item.data;
        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.autor}>{email}</Text>
                    <Text style={styles.fecha}>{this.formatDate(this.props.item.data.createdAt)}</Text>
                </View>
                <Text style={styles.descripcion}>{descripcion}</Text>
                <View style={styles.likes}>
                    {this.state.like ? (
                        <TouchableOpacity onPress={() => this.handleUnlike()}>
                            <PiHeartStraightFill style={styles.buttonLikes} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => this.handleLike()}>
                            <PiHeartStraightLight style={styles.buttonLikes} />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.contador}>{this.state.cantidad} Likes</Text>
                </View>
                {email === auth.currentUser.email && (
                    <TouchableOpacity onPress={() => this.handleDelete()}>
                        <PiTrash style={styles.deleteButton} />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 14,
        marginBottom: 22,
        padding: 14,
        shadowColor: '#004',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 11,
    },
    autor: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#703f30',
    },
    fecha: {
        fontSize: 12,
        color: '#aaa',
        marginLeft: 10,
    },
    descripcion: {
        fontSize: 15,
        color: '#333',
        lineHeight: 26,
        marginBottom: 16,
    },
    likes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonLikes: {
        color: '#f2c2b8',
    },
    contador: {
        fontSize: 13,
        color: '#703f30',
        marginLeft: 11,
    },
    deleteButton: {
        color: '#f2c2b8'
    }
});
