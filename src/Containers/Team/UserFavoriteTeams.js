import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export default class UserFavoriteTeams extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedUserTeams: ''
    }
  }

  componentDidMount() {
    const formattedUserTeams = this.props.userTeams.map(team => {
      return(
        <Col md="auto">{team.name}</Col>
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