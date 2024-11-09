import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Profile({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Pantalla de Profile</Text>
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