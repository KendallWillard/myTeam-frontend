import React from 'react';
import { Row, ButtonToolbar, Button, Container } from 'react-bootstrap';
import './Team.css'

export default class UserFavoriteTeams extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedUserTeams: '',
      isLoading: false
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.changeCurrentTeam(event.target.innerHTML);
    //Must wait to remount due to the fetching of news articles from the news api
    setTimeout(() => this.props.reMountComponent(), 1000 );
    // Handles the Loading... text on the favorite teams
    this.setState({isLoading: true}, this.formatUserTeams);
    setTimeout(() => this.setState({isLoading: false}, this.formatUserTeams), 1100); 
  }

  formatUserTeams = () => {
    const formattedUserTeams = this.props.userTeams.map(team => {
      return( 
        <Button
        key={team.id}
        variant=""
        onClick={this.handleClick}
        id='favorite-team' 
        >
        {this.state.isLoading ? <p>Loading...</p> : team.name}
        </Button>
      )
    })
    this.setState({formattedUserTeams})
  }

  componentDidMount() {
    this.formatUserTeams();
  }

  
  render() {
    return(
      <Container>
        <Row className="justify-content-md-center">
          <ButtonToolbar>
            {this.state.formattedUserTeams}
          </ButtonToolbar>
        </Row>
        </Container>
    )
  }
}