import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Pantalla de Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6f4e37',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#8f8f8f',
        textAlign: 'center',
        marginBottom: 20,
    },
});