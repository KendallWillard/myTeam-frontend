import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom'
import './LoginForm.css'

export default class FormPage extends React.Component {
  state = {
    username: '',
    password: '',
    loggedIn: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.logUserIn();
  }

  redirectToHome = (event) => {
    this.setState({
      loggedIn: true
    })
  }


  render() {
    if(this.state.redirectToHome) {
      return <Redirect to='/home' />
    }
    return (
      <MDBContainer id="form-container">
        <MDBRow>
          <MDBCol md="12">
            <form>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <MDBInput
                  label="Type your username"
                  icon="envelope"
                  group
                  type="ninja-user"
                  validate
                  error="wrong"
                  success="right"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.password}
                />
              </div>
              <div className="text-center">
                <MDBBtn onClick={this.handleSubmit}>Login</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };
};
