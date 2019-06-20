import React, { Component } from 'react';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';
import axios from 'axios';
import './App.css';

axios.defaults.headers.common['Content-Type'] = 'application/json';


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
    .get('http://localhost:9090/posts')
    .then(response => this.setState({ posts: response.data }));

  }

  updatePost(id, text, date) {
    axios.put(`http://localhost:9090/posts/${id}`, { text, date }).then(response => {
      const updatedPost = response.data;

      const updatedPosts = this.state.posts.map(post => {
        if (post.id === updatedPost.id) {
          return { post, ...updatedPost };
        } else {
          return post;
        }
      });

      this.setState({ posts: updatedPosts });
    });
  }


  deletePost() {}

  createPost() {}

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose />
          {posts.map(post => (
            <Post 
              key={post.id} 
              text={post.text}
              date={post.date} 
              updatePostFn={this.updatePost}
              id={post.id}
              />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
