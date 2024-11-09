import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import {db} from '../firebase/config';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
        };
    }
    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        usuarios: users
                    })
                })
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Users</Text>
                <FlatList
                    data={this.state.usuarios}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text>Email: {item.data.email}</Text>
                            <Text>Username: {item.data.userName}</Text>
                            <Text>Created At: {item.data.createdAt}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});