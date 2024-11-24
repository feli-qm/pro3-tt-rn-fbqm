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
      .then(() => {
        const updatedPosts = this.state.userPosts.filter(p => p.id !== postId) 
        this.setState({
          userPosts: updatedPosts
        });
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image style={styles.image}
            source={require('../../assets/parfume.png')}
            resizeMode='contain'
          />

          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.detail}>Email: {this.state.email}</Text>
          <Text style={styles.detail}>User Name: {this.state.userName}</Text>
          <Text style={styles.detail}>Número de posts: {this.state.userPosts.length}</Text>

          {this.state.errorMsg ? (
            <Text style={styles.error}>{this.state.errorMsg}</Text>
          ) : null}

          <FlatList 
            data={this.state.userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post item = {item}/>
            )}
          />
  
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Playfair Display',
    fontWeight: 'bold',
    color: '#703f30',
    textAlign: 'center',
    marginBottom: 10,
  },
  detail: {
    fontSize: 20,
    fontFamily: 'Playfair Display',
    color: '#703f30',
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#cd933f',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Playfair Display',
  },
  errorMsg: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  preview: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});