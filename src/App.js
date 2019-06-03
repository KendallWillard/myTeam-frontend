import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextFieldMargins from './TeamInput'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TextFieldMargins />
      </div>
    );
  }
}

export default App;
