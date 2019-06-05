import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom'
import '../LoginPage/LoginForm.css'
// import { responsiveFontSizes } from "@material-ui/core/styles";

export default class SignUpPage extends React.Component {
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
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
     user: {
      username: this.state.username,
      password: this.state.password,
      first_name: 'kendall',
      last_name: 'willard',
      phone: '4172945180'
    }
  })
    })
  .then(result => result.json())
  .then(response => window.localStorage.setItem(this.state.username, response.jwt))
  .catch(console.error)
  }

  redirectToHome = (event) => {
    this.setState({
      loggedIn: true
    })
  }


  render() {
    if(this.state.loggedIn) {
      return <Redirect to='/home' />
    }
    return (
      <MDBContainer id="form-container">
        <MDBRow>
          <MDBCol md="12">
            <form>
              <p className="h5 text-center mb-4">Sign Up</p>
              <div className="grey-text">
                <MDBInput
                  label="Type your username"
                  icon="user-ninja"
                  group
                  type="text"
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
                <MDBBtn onClick={this.handleSubmit}>Sign Up</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };
};
