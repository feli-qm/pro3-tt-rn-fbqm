import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import {db} from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts
                    })
                })
            }
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Posts</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Post email = {item.data.email} mensaje = {item.data.mensaje}/>
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