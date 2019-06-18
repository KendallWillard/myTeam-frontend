import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './WelcomePage.css';


export default class InfoPage extends Component {

  render() {
    return(
        <div className="welcomePage">
          <ul>
            <li><h1>Welcome to myTeams</h1></li>
              <li>
                <h1>Where you can view your favorite sports teams recent news, current scores, and upcoming games.
                  <li>
                    <h1>This app is current in beta. Have fun.</h1>
                  </li>
                </h1>
              </li>
            <Button href="/signup" variant="success">Sign Up Here</Button>
            <Button href="/login" variant="warning">Login Here</Button>
          </ul>
      </div>

    )
  }
}