import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  registerUser,
  verifyToken,
  loginUser } from './services/user';
import {
    getPosts,
    createPost } from './services/post';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostForm from './components/PostForm';
import PostsList from './components/PostsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFormData: {
        name: '',
        email: '',
        password: '',
      },
      currentUser: null,
      loginFormData: {
        email: '',
        password: ''
      },
      postForm: {
        body: '',
        description: '',
        posted_by: ''
      },
      posts: [],
    }
    this.handleRegisterFormChange = this.handleRegisterFormChange.bind(this);
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePostFormChange = this.handlePostFormChange.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
  };

  async componentDidMount() {
    try {
      const { user } = await verifyToken();
      if (user !== undefined) {
      this.setState({
        currentUser: user
      })
      await this.fetchPosts();
      await this.fetchUsers();
      } else {
        this.props.history.push('/');
      }
    } catch (e) {
      this.props.history.push('/');
    }
  }

  async fetchPosts() {
     const posts = await getPosts();
     this.setState({
       posts
     });
   }


    async handleLogin(e) {
    e.preventDefault();
    const { user }= await loginUser(this.state.loginFormData);
    this.setState({
      currentUser: user,
      postForm: {
        posted_by: user.name
      }
    });
    this.fetchPosts();
    this.props.history.push('/feed');
  }

  handleLoginFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }

  handleRegisterFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  async handleRegister(e) {
    e.preventDefault();
    const { registerFormData } = this.state;
    const { user } = await registerUser(registerFormData);
    this.setState({
      currentUser: user,
      postForm: {
        posted_by: user.name
      }
    });
    this.fetchPosts();
    this.props.history.push('/feed');
  }


  async handleCreatePost() {
    await createPost(this.state.postForm);
   }

   async handleSubmitPost(e){
     e.preventDefault();
     await this.handleCreatePost();
     this.fetchPosts();
     this.props.history.push('/feed')
   }

   handlePostFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      postForm: {
        ...prevState.postForm,
        [name]: value
      }
    }))
  }

  render() {
    console.log(this.state.posted_by);
    const {
      currentUser
    } = this.state;

    return (
      <div className="App">

      {this.state.currentUser === null && (
        <nav>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </nav>
      )}

      <Route exact path="/" render={(props) => {
          return (
            <>
            {this.state.currentUser && <Redirect to="/register" />}
            </>
          )
        }} />

      <Route path="/register" render={(props) => {
          const {
            name,
            email,
            password
          } = this.state.registerFormData;
          return (
            <RegisterForm
              name={name}
              email={email}
              password={password}
              handleChange={this.handleRegisterFormChange}
              handleSubmit={this.handleRegister} />
          )
        }} />

        <Route path="/login" render={(props) => {
          const {
            email,
            password
          } = this.state.loginFormData;
          return (
            <LoginForm
              email={email}
              password={password}
              handleChange={this.handleLoginFormChange}
              handleSubmit={this.handleLogin} />
          )
        }} />

        <Route exact path="/posts/new" render={(props) => {
        const {
          body,
          description
        } = this.state.postForm;

        return (
          <PostForm
            body={body}
            description={description}
            handleChange={this.handlePostFormChange}
            handleSubmit={this.handleSubmitPost} />
        );
      }} />

      <Route exact path="/feed" render={(props) => {
      const {
        posts
      } = this.state;

      const {
        body,
        description
      } = this.state.postForm;
      return (
        <>
        <PostForm
          body={body}
          description={description}
          handleChange={this.handlePostFormChange}
          handleSubmit={this.handleSubmitPost} />

        <PostsList
          users={this.state.users}
          posts={posts} />
        </>
      );
    }} />


      </div>
    );
  }
}

export default withRouter(App);
