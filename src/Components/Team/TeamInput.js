import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card, Container } from 'semantic-ui-react';
import apiConfig from '../../../apiKeys'
const FIRST_HALF_BASE_URL = 'https://newsapi.org/v2/everything?q=',
      SECOND_HALF_BASE_URL = `&sortBy=publishedAt&pageSize=100&apiKey=${apiConfig.newsApi}`;


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
    event.preventDefault();
    fetch(`${FIRST_HALF_BASE_URL}${this.state.teamName}${SECOND_HALF_BASE_URL}`)
    .then(response => response.json())
    .then(teamNews => this.setState({teamNews}) )
    .catch(error => console.error(error));
  }

  parseNewsArticles = () => {
    const parsedArticles = this.state.teamNews.articles.filter(article => article.title.includes('Chiefs'));
    const allTheArticles = parsedArticles.map((article, ndx) => <Card header={article.title} description={article.description} fluid color='red' key={Date.now() + ndx} />)
    this.setState({
      allTheArticles: allTheArticles
    })
  }

  render() {
    return (
      <Container text>
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
          onClick={this.parseNewsArticles}
        >
          Parse News Info
        </Button>
          {this.state.allTheArticles}
        </Container>

    );
  }
}
