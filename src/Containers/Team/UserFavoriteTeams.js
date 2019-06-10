import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export default class UserFavoriteTeams extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedUserTeams: ''
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.changeCurrentTeam(event.target.innerHTML)
    setTimeout(() => this.props.reMountComponent(), 500 )
  }

  componentDidMount() {
    console.log('fired')
    const formattedUserTeams = this.props.userTeams.map(team => {
      return(
        <Col 
        key={team.id}
        md="auto"
        onClick={this.handleClick}
        >{team.name}</Col>
      )
    })
    this.setState({formattedUserTeams})
  }

  
  render() {
    return(
      <Container>
        <Row className="justify-content-md-center">
          {this.state.formattedUserTeams}
        </Row>
        </Container>
    )
  }
}