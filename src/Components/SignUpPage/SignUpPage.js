import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBIcon } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import './SignUpPage.css';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { Alert } from 'react-bootstrap';
const BASE_HOSTING_URL = `https://salty-dusk-65324.herokuapp.com`;
const override = css`
    display: block;
`;


export default class SignUpPage extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phone: '',
    redirectToLogin: false,
    redirectToHome: false,
    loading: false,
    dupUsername: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleDismiss = () => {
    this.setState({dupUsername: false})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${BASE_HOSTING_URL}/users`, {
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
  .then(this.redirectToLogin)
  .catch(console.error)
  }

  redirectToLogin = ({ error, jwt, user }) => {
    if(error.username) {
      this.setState({dupUsername: true})
    }
    else {
      this.setState({loading: true});
      window.localStorage.setItem( 'userID', user.id );
      window.localStorage.setItem( 'jwtToken', jwt ) ;
      setTimeout(() => this.setState({redirectToHome: true}), 1000 )
    }
  }


  render() {
    if(this.state.redirectToLogin) {
      return <Redirect to='/login' />
    }
    if(this.state.redirectToHome) {
      return <Redirect to='/home' />
    }
    return (
      <MDBContainer id="form-container">
      {this.state.dupUsername &&
        <Alert variant="danger" onClose={this.handleDismiss} dismissible>
          <Alert.Heading>Error! Username has already been taken.</Alert.Heading>
          <p>
            Please Try Again...
          </p>
        </Alert>
      }
      {
        this.state.loading && 
          <div id="ringloader">
            <RingLoader
            css={override}
            sizeUnit={"px"}
            size={400}
            color={'#1030D8'}
            loading={this.state.loading}
            />
          </div>
      }
      {
        !this.state.loading &&    
        <MDBRow>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                    <h3 className="my-3">
                      <MDBIcon icon="lock" /> Sign Up:
                    </h3>
                  </MDBCardHeader>
              <form>
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
                  <MDBBtn color="warning" onClick={this.redirectToLogin}>Login Page</MDBBtn>

                </div>
              </form>
            </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      }
      </MDBContainer>
    );
  };
};
