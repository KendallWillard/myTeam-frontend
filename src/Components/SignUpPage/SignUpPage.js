import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom'
import '../../Containers/LoginPage/LoginForm.css'
// import { responsiveFontSizes } from "@material-ui/core/styles";

export default class SignUpPage extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phone: '',
    signedUp: false
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
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone: this.state.phone
    }
  })
    })
  .then(result => result.json())
  .then(response => window.localStorage.setItem(this.state.username, response.jwt))
  .then(this.redirectToLogin)
  .catch(console.error)
  }

  redirectToLogin = () => {
    this.setState({signedUp: true})
  }


  render() {
    if(this.state.signedUp) {
      return <Redirect to='/login' />
    }
    return (
      <MDBContainer id="form-container">
        <MDBRow>
          <MDBCol md="12">
            <form>
              <p className="h5 text-center mb-4">Sign Up</p>
              <div className="grey-text">
                <MDBInput
                  label="First Name..."
                  icon="user-ninja"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
                <MDBInput
                  label="Last Name..."
                  icon="user-ninja"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
                <MDBInput
                  label="Phone..."
                  icon="mobile"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
                <MDBInput
                  label="Username..."
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
                  label="Password..."
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
