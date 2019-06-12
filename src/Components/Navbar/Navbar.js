import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default class myNavbar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/login">Logout</Nav.Link>
        <Nav.Link href="/signup">Pricing</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="danger" onClick={this.logout} >Logout</Button>
      </Form>
    </Navbar>
    )
  }
}