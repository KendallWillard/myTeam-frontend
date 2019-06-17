import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import apiConfig from '../../apiKeys';
import DisplayTeamArticles from './DisplayTeamArticles';
import TeamCarousel from './TeamCarousel';
import CurrentScores from './CurrentScores';
import Navbar from '../../Components/Navbar/Navbar';
import UpcomingGames from './UpcomingGames';
var moment = require('moment')
import './Team.css';
const FIRST_HALF_NEWS_URL = 'https://newsapi.org/v2/everything?q=',
      SECOND_HALF_NEWS_URL = `&sortBy=publishedAt&pageSize=100&apiKey=${apiConfig.newsApiTwo}`,
      BASE_HOSTING_URL = `https://salty-dusk-65324.herokuapp.com`;



class TeamHomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teamName: '',
      teamNews: [],
      userId: 0,
      teamId: 0,
      jwtToken: '',
      button: '',
      userTeams: [],
      upcomingGames: [],
      displaysNews: false,
      redirectToLogin: false
    }
  }

  changeCurrentTeam = (teamName) => {
    this.setState({teamName}) 
    setTimeout(() => this.fetchAndSetNewsArticles(), 100 )
  }
  
  componentDidMount() {
    let currentDate = moment().format("YYYY-MMM-D");
    this.setState({currentDate})
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
    .then(this.getNext10Dates)
    .catch(console.error)
  }

  mountNewsComponent = () => {
    this.setState({displaysNews: true})
  }

  getDefaultUserTeam = () => {
    this.setState({
      teamName: this.state.userTeams[0].name,
      teamId: this.state.userTeams[0].id
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  getCurrentTeamId = () => {
    // Retrieve the current team selected from user teams stored in state and then grab its ID
     return ( this.state.userTeams.filter(team => team.name === this.state.teamName) )[0].id
  }

  destoryFavoriteUserTeam = () => {
    const currTeamID = this.getCurrentTeamId();
    fetch(`${BASE_HOSTING_URL}/users/${this.state.userId}/teams/${currTeamID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.jwtToken}`
      }
    })
    .catch(console.error)
    setTimeout(() => window.location.reload(true), 500)
  }

  fetchAndSetNewsArticles = () => {
    this.fetchUpcomingGames();
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
    this.fetchAndSetNewsArticles();

    setTimeout(() => window.location.reload(true), 1000)
  }

  fetchUpcomingGames = () => {
    this.clearUpcomingGamesState();
    let originalMonth = this.state.currentDate.split('-')[1]
    let dateOnly = this.state.currentDate.split('-')[2]; // Get the date only  
    let monthOnly = originalMonth.toUpperCase(); // Month Only
    let yearOnly = this.state.currentDate.split('-')[0]; // Year only 
      // Retrieve all the games left in the current month
      while(dateOnly++ < 30) {
      fetch(`https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/${yearOnly}-${monthOnly}-${dateOnly}?key=${apiConfig.sportsdataApi}`)
      .then(response => response.json())
      .then(this.parseUpcomingGames)
      .catch(console.error)
    }
    const upcomingGames = this.state.upcomingGames.sort((alpha, beta) => alpha.time.localeCompare(beta.time))
    this.setState({upcomingGames})
  }

  clearUpcomingGamesState = () => {
    this.setState({upcomingGames: []})
  }

  // Only save the games that are relevant to the current team selected by the user
  parseUpcomingGames = (games) => {
    const favTeamGamesOnly = games.filter( game => game.AwayTeam.includes( this.abbreviateMLBteam() ) || game.HomeTeam.includes( this.abbreviateMLBteam() ) )
    const filteredGames = favTeamGamesOnly.map(game => {
      return {
        homeTeam: game.HomeTeam,
        awayTeam: game.AwayTeam,
        time: game.DateTime,
        channel: game.Channel
      }
    })
    this.setState(state => {
      const upcomingGames = [...state.upcomingGames, filteredGames]
      return { upcomingGames }
    })

  }
  redirectToLogin = () => {
    this.setState({redirectToLogin: true})
  }

  abbreviateMLBteam = () => {
    switch ( this.state.teamName ) {
      case 'Baltimore Orioles':
        return 'BAL';
      case 'Boston Red Sox':
        return 'BOS';
      case 'Chicago White Sox':
        return 'CHW';
      case 'Cleveland Indians':
        return 'CLE';
      case 'Detroit Tigers':
        return 'DET';
      case 'Houston Astros':
        return 'HOU';
      case 'Kansas City Royals':
        return 'KC';
      case 'Los Angeles Angels':
        return 'LAA';
      case 'Oakland Athletics':
        return 'OAK';
      case 'Seattle Mariners':
        return 'SEA';
      case 'Tampa Bay Rays':
        return 'TB';
      case 'Texas Rangers':
        return 'TEX';
      case 'Toronto Blue Jays':
        return 'TOR';
      case 'Arizona Diamondbacks':
        return 'ARI';
      case 'Atlanta Braves':
        return 'ATL';
      case 'Chicago Cubs':
        return 'CHC';
      case 'Cincinnati Reds':
        return 'CIN';
      case 'Colorado Rockies':
        return 'COL';
      case 'Los Angeles Dodgers':
        return 'LAD';
      case 'Miami Marlins':
        return 'MIA';
      case 'Milwaukee':
        return 'MIL';
      case 'New York Mets':
        return 'NYM';
      case 'Philadelphia Phillies':
        return 'PHI';
      case 'Pittsburgh Pirates':
        return 'PIT';
      case 'San Diego Padres':
        return 'SD';
      case 'San Francisco Giants':
        return 'SF';
      case 'St. Louis Cardinals':
        return 'STL';
      case 'Washington Nationals':
        return 'WAS';
      case 'New York Yankees':
        return 'NYY';
    }
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
        {this.state.teamNews.articles &&
          <UpcomingGames upcomingGames={this.state.upcomingGames} />
        }
      <Button id='removeTeam' variant="danger" onClick={this.destoryFavoriteUserTeam} >Delete Team</Button>
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