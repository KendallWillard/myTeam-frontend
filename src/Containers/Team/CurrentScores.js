import React from 'react';
import { ListGroup } from 'react-bootstrap';
const BASE_MLB_URL = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard'

export default class CurrentScores extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentScores: [],
      formattedScores: []
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.teamName !== prevProps.teamName) {
      this.getCurrentMLBGames()
    }
  }

  parseCurrentScores = (currentGames) => {
    let currentScores = [];
    currentGames.events.map(game => {
      if( game.name.includes(this.props.teamName) ) {
        const myGameObj = {
          homeTeam: game.competitions[0].competitors[0].team.displayName,
          homeTeamScore: game.competitions[0].competitors[0].score,
          awayTeam: game.competitions[0].competitors[1].team.displayName,
          awayTeamScore:  game.competitions[0].competitors[1].score,
          gameStatus: game.competitions[0].status.type.detail
        }
        currentScores.push(myGameObj);
      }
      this.setState({currentScores: currentScores });
    })
  }

  formatTheScores = () => {
    const formattedScores = this.state.currentScores.map(game => {
      return(
        <ListGroup>
          <ListGroup.Item variant="success">{game.homeTeam}: {game.homeTeamScore}</ListGroup.Item>
          <ListGroup.Item variant="danger">VS</ListGroup.Item>
          <ListGroup.Item variant="secondary">{game.awayTeam}: {game.awayTeamScore}</ListGroup.Item>
          <ListGroup.Item variant="warning">{game.gameStatus}</ListGroup.Item>
          <br></br>
        </ListGroup>

      )
    })
    this.setState({formattedScores})
  }

  componentDidMount() {
    this.getCurrentMLBGames();
  }

  getCurrentMLBGames = () => {
    fetch(`${BASE_MLB_URL}`)
    .then(response => response.json())
    .then(this.parseCurrentScores)
    .then(this.formatTheScores)
    .catch(console.error)
  }
  render() {
    return(
    <ListGroup>
      <ListGroup.Item variant="info">Daily Scores: </ListGroup.Item>
      {this.state.formattedScores}
    </ListGroup>
    )
  }
}