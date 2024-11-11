import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import {db} from '../firebase/config';

export default function Post({ email, descripcion }) {
    return (
            <View style={styles.userInfo}>
                            <Text>Email: {email}</Text>
                            <Text>Descripcion: {descripcion}</Text>
            </View>
        );
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
        userInfo: {
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#dfb084',
            borderRadius: 8,
            backgroundColor: '#f2c2b8',
        },
    });
    