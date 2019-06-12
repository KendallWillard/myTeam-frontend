import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import apiConfig from '../../apiKeys';
import DisplayTeamArticles from './DisplayTeamArticles';
import TeamCarousel from './TeamCarousel';
import CurrentScores from './CurrentScores';
import Navbar from '../../Components/Navbar/Navbar';
import './Team.css';
const FIRST_HALF_NEWS_URL = 'https://newsapi.org/v2/everything?q=',
      SECOND_HALF_NEWS_URL = `&sortBy=publishedAt&pageSize=100&apiKey=${apiConfig.newsApi}`,
      BASE_HOSTING_URL = `https://salty-dusk-65324.herokuapp.com`;



class TeamHomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teamName: '',
      teamNews: [],
      userId: 0,
      jwtToken: '',
      userTeams: [],
      displaysNews: false,
      redirectToLogin: false
    }
  }

  changeCurrentTeam = (teamName) => {
    this.setState({teamName}) 
    setTimeout(() => this.fetchAndSetNewsArticles(), 100 )
  }
  
  componentDidMount() {
    const userId = parseInt( window.localStorage.getItem('userID') ),
          jwtToken = window.localStorage.getItem('jwtToken')
    this.setState({userId, jwtToken})
    fetch(`${BASE_HOSTING_URL}/users/${userId}/teams`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then(response => response.json())
    .then(userTeams => this.setState({userTeams}))
    .then(this.getDefaultUserTeam)
    .then(this.fetchAndSetNewsArticles)
    .catch(console.error)
  }

  mountNewsComponent = () => {
    this.setState({displaysNews: true})
  }

  getDefaultUserTeam = () => {
    this.setState({teamName: this.state.userTeams[0].name})
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  fetchAndSetNewsArticles = () => {
    fetch(`${FIRST_HALF_NEWS_URL}${this.state.teamName}${SECOND_HALF_NEWS_URL}`)
    .then(response => response.json())
    .then(teamNews => this.setState({teamNews}) )
    .catch(console.error);
  }

  postNewTeamWithUser = (teamName) => {
    const { userId, jwtToken } = this.state;
    const team = {
      name: teamName,
      city: teamName,
      description: teamName,
      user_id: userId
    }
    fetch(`${BASE_HOSTING_URL}/users/${userId}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({team})
    })
    .catch(console.error)
  }
  
  handleClick = (event) => {
    event.preventDefault();
    this.fetchAndSetNewsArticles();
  }

  handleTeamSelection = (event) => {
    const { value } = event.target
    this.setState({teamName: value})
    this.postNewTeamWithUser(value)
  }

  logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('jwtToken')
    this.redirectToLogin();
  }

  redirectToLogin = () => {
    this.setState({redirectToLogin: true})
  }

  render() {
    if(this.state.redirectToLogin) {
      return <Redirect to='/login' />
    }
    return (
      <div className="teamInput">  
      <Navbar handleTeamSelection={this.handleTeamSelection}/>
      {this.state.teamNews.articles && 
        <TeamCarousel userTeams={this.state.userTeams}/>
      }    
      <Container fluid>
      <Row>
      <Col sm={2} id='current-scores'>
        {this.state.teamNews.articles &&
          <CurrentScores userTeams={this.state.userTeams} teamName={this.state.teamName} />
        }
      </Col>
      <Col sm={10}>
    { this.state.teamNews.articles &&
        <DisplayTeamArticles 
        teamArticles={this.state.teamNews.articles} 
        teamName={this.state.teamName}
        userTeams={this.state.userTeams} 
        changeCurrentTeam={this.changeCurrentTeam}
        />
      } 
      </Col>
      </Row>
      </Container>
        </div>
    );
  }
}

const mapStateToProps = state => (
  {
  id: state.user.id,
  jwtToken: state.user.jwtToken
})

export default connect( mapStateToProps, null)(TeamHomePage)