import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import {db} from '../firebase/config';

export default function Post({ email, mensaje }) {
    return (
            <View style={styles.container}>
                            <Text>Email: {email}</Text>
                            <Text>Mensaje: {mensaje}</Text>
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});