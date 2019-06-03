import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const FIRST_HALF_BASE_URL = 'https://newsapi.org/v2/everything?q=',
      SECOND_HALF_BASE_URL = '&sortBy=publishedAt&pageSize=100&apiKey=53818aecb0a14363aad6e7b4642074bf';


export default class TextFieldMargins extends React.Component {
  state = {
    teamName: '',
    teamNews: []
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleClick = (event) => {
    console.log(this.state.teamName)
    event.preventDefault();
    fetch(`${FIRST_HALF_BASE_URL}${this.state.teamName}${SECOND_HALF_BASE_URL}`)
    .then(response => response.json())
    .then(teamNews => this.setState({teamNews}) )
    .catch(error => console.error(error));
  }

  parseNewsArticles = () => {

  }

  render() {
    return (
      <div >
        <TextField
          label="None"
          id="margin-none"
          helperText="Some important text"
          name="teamName"
          value={this.state.teamName}
          onChange={this.handleChange}
        />

        <Button 
          variant="contained" 
          color="primary"
          onClick={this.handleClick}
        >
          Search
        </Button>
        <Button 
          variant="contained"
          onClick={this.handleClick}
        >
          Parse News Info
        </Button>
      </div>
    );
  }
}
