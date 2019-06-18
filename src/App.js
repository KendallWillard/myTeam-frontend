import React, { Component } from 'react';
import './App.css';
import TextFieldMargins from './Containers/Team/TeamHomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './Containers/LoginPage/LoginForm';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import InfoPage from './Components/Info/InfoPage';
import WelcomePage from './Components/WelcomePage/WelcomePage';

class App extends Component {
  state = {
    username: ''
  }

  setUsername = (username) => {
    this.setState({username});
  }
  render() {
    return (
        <Router >
          <Route exact path='/home' render={() => {
            return <TextFieldMargins />
          }} />
          <Route exact path='/login' render={() => {
            return <LoginPage setUsername={this.setUsername}/>
          }} />
          <Route exact path='/signup' render={() => {
            return <SignUpPage />
          }} />  
          <Route exact path='/' render={() => {
            return <WelcomePage />
          }} />
          <Route exact path='/info' render={() => {
            return <InfoPage />
          }} />
        </Router>
    );
  }
}

export default App;
