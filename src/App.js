import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextFieldMargins from './TeamInput'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FormPage from './LoginForm'

class App extends Component {
  render() {
    return (
        <Router >
          <Route exact path='/home' render={() => {
            return <TextFieldMargins />
          }} />
          <Route exact path='/login' render={() => {
            return <FormPage />
          }} />
        </Router>
    );
  }
}

export default App;
