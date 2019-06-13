import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

import { Redirect } from 'react-router-dom'
import './LoginForm.css'
import { connect } from 'react-redux';
import { setUserInfo } from '../../Actions/setUserInfo';
const BASE_HOSTING_URL = `https://salty-dusk-65324.herokuapp.com`;


export default class FormPage extends React.Component {
  state = {
    username: '',
    password: '',
    jwtToken: '',
    loggedIn: false,
    incorrectPassword: false,
    signUpPage: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
  
  handleLogin = ( {message, user, jwt} ) => {
    if( message === 'Invalid username or password' ) 
    {
      this.setState({loggedIn: false, incorrectPassword: true});

    }
    else {
      window.localStorage.setItem( 'userID', user.id )
      window.localStorage.setItem( 'jwtToken', jwt ) 
      this.setState({loggedIn: true});
    }
  }

  fetchUserInfo = (event) => {
    const { username, password } = this.state
    event.preventDefault();
    fetch(`${BASE_HOSTING_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: { username, password }
      })
    })
    .then(response => response.json())
    
    .then(this.handleLogin)
    .catch(console.error)
  }


  redirectToHome = (event) => {
    this.setState({loggedIn: true})
  }

  redirectToSignUpPage = () => {
    this.setState({signUpPage: true})
  }

  componentDidMount() {
    console.log('mounted')
  }
  render() {
    if(this.state.loggedIn) {
      return <Redirect to='/home' />
    }
    if(this.state.signUpPage) {
      return <Redirect to='/signup' />
    }
    return (
      <div className="formParent">
      <MDBContainer id="form-container">
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Login:
                </h3>
              </MDBCardHeader>
              <form>
                <div className="grey-text">
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

              <div className="text-center mt-4">
                <MDBBtn
                  color="light-blue"
                  className="mb-3"
                  type="submit"
                  onClick={this.fetchUserInfo}
                >
                  Login
                </MDBBtn>
              </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p id="sign-up" onClick={this.redirectToSignUpPage}>Not a member? Sign Up</p>
                  <p id="sign-up">Forgot Password?</p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {this.state.incorrectPassword ? <h1>Error! Incorrect Username or Password</h1> : null}

    </MDBContainer>
    </div>
    );
  };
};

