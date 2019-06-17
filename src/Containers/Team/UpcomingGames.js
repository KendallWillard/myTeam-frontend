import React from 'react';
import { ListGroup } from 'react-bootstrap';
const moment = require('moment');

export default class UpcomingGames extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentScores: [],
      upcomingGames: []
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.upcomingGames !== prevProps.upcomingGames) {
      this.formatUpcomingGames();
    }
  }

  componentDidMount() {
    this.formatUpcomingGames()
  }

  formatUpcomingGames = () => {
    const upcomingGames = this.props.upcomingGames.map(game => {
      console.log(game)
      if(game[0]) {
        return(
          <ListGroup>
            <ListGroup.Item variant="success">{game[0].awayTeam}</ListGroup.Item>
            <ListGroup.Item variant="danger">@</ListGroup.Item>
            <ListGroup.Item variant="secondary">{game[0].homeTeam}</ListGroup.Item>
            <ListGroup.Item variant="warning">TV Channel: {game[0].channel}</ListGroup.Item>
            <ListGroup.Item variant="warning">Time: {moment(game[0].time).utcOffset(-300).format('llll')} Central</ListGroup.Item>
            <br></br>
          </ListGroup>
  
        )
      }
      else {
        return null;
      }

    })
    this.setState({upcomingGames})
  }

  render() {
    return(
    <ListGroup>
      <ListGroup.Item variant="info">Upcoming Games: </ListGroup.Item>
      {this.state.upcomingGames}
    </ListGroup>
    )
  }
}