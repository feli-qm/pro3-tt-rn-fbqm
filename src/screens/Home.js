import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-web';
import {db} from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        };
    }
    componentDidMount(){
        this.setState({
            loading: true
        })
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            (docs) => {
                let posts = [];
                docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                    this.setState({
                        posts: posts,
                        loading: false,
                    });
                });
            }
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                <Image style={styles.logo}
                        source={require('../../assets/parfume-sinfondo.png')}
                        resizeMode='contain' 
                    />
                    </View>
                <Text style={styles.title}>Posts</Text>
                {!this.state.loading && <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Post item = {item}/>
                    )}
                />}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6f4e37',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#8f8f8f',
        textAlign: 'center',
        marginBottom: 20,
    },
});