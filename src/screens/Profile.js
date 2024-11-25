import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser.email,
      userName: '',
      errorMsg: '',
      userPosts: [],
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          this.setState({ userName: doc.data().userName })
        })
      })

    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        posts.sort((a, b) => b.data.createdAt - a.data.createdAt);
        this.setState({ userPosts: posts })
      })
  }

  handleLogout() {
    auth.signOut()
      .then(() => {
        console.log('Usuario deslogueado');
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        console.error('Error al desloguear: ', error);
        this.setState({ errorMsg: 'Error al desloguear. Intenta de nuevo.' });
      });
  }

  handleDeletePost = (postId) => {
    db.collection('posts').doc(postId).delete()
      .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require('../../assets/parfume-sinfondo.png')}
            resizeMode='contain'
          />
        </View>

        <Text style={styles.title}>Tu Perfil</Text>

        <View style={styles.userContainer}>
          <Text style={styles.detail}>Email: {this.state.email}</Text>
          <Text style={styles.detail}>User Name: {this.state.userName}</Text>
          <Text style={styles.detail}>Número de posts: {this.state.userPosts.length}</Text>
          {this.state.errorMsg ? (
            <Text>{this.state.errorMsg}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Tus Posts</Text>

        <FlatList
          data={this.state.userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post item={item} />
          )}
        />
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
    fontSize: 34,
    fontWeight: 'bold',
    color: '#703f30',
    textAlign: 'center',
    marginBottom: 10,
  },
  userContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 22,
    padding: 14,
    shadowColor: '#004',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  detail: {
    fontSize: 16,
    color: '#703f30',
    textAlign: 'center',
    margin: 5,
  },
  button: {
    backgroundColor: '#cd933f',
    paddingVertical: 5,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#703f30',
    marginBottom: 10,
  }
});