import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './WelcomePage.css';


export default class InfoPage extends Component {

  render() {
    return(
        <div className="welcomePage">
          <ul>
            <li><h1>Welcome to myTeams. This app is currently in a baby alpha stage. Have fun!</h1></li>
            <Button href="/signup" variant="success">Sign Up Here</Button>
            <Button href="/login" variant="warning">Login Here</Button>
          </ul>
      </div>

    )
  }
}