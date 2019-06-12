import React, { Component } from 'react';
import './App.css';
import TextFieldMargins from './Containers/Team/TeamHomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './Containers/LoginPage/LoginForm';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import Navbar from './Components/Navbar/Navbar';
import InfoPage from './Components/Info/InfoPage';

class App extends Component {

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
          <Route exact path='/info' render={() => {
            return <InfoPage />
          }} />
        </Router>
    );
  }
}

export default App;
