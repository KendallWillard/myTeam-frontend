import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './InfoPage.css';


export default class InfoPage extends Component {
  render() {
    return(
      <div>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">My Teams</Navbar.Brand>
              <Nav className="mr-auto">
            <Button href="/home" variant="success">Back to Home</Button>
             </Nav>
          </Navbar>
        </div>
        <div className="infoPage">
          <ul>
            <li><h1>Welcome to the info page!</h1></li>
            <li><h2>More Will Follow</h2></li>
          </ul>
        </div>
      </div>

    )
  }
}