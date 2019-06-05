import React, { Component } from 'react';
import './App.css';
import TextFieldMargins from './Components/Team/TeamInput'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './Components/LoginPage/LoginForm'
import SignUpPage from './Components/SignUpPage/SignUpPage'

class App extends Component {

  state = {
    userId: 0,
    username: ''
  }

  render() {
    return (
        <Router >
          <Route exact path='/home' render={() => {
            return <TextFieldMargins />
          }} />
          <Route exact path='/login' render={() => {
            return <LoginPage />
          }} />
          <Route exact path='/signup' render={() => {
            return <SignUpPage />
          }} />
        </Router>
    );
  }
}

export default App;
