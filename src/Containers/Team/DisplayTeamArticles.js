import React, { Component } from 'react';
import { CardDeck, Card, Col, Row } from 'react-bootstrap'

export default class DisplayTeamArticles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedArticles: []
    }
  }

  convertDateToUserFriendly = (parsedArticles) => {
    const dateOnly = parsedArticles.map(article => {
      return(
        article.publishedAt.split('T')[0]
      )
    })
    console.log(dateOnly)
  }


  showArticles = () => {
    const parsedArticles = this.props.teamArticles.articles.filter(article =>  {
      if( article.description && article.title && article.content) { 
  // For some reason some of the articles description are not attributes so this code will break
  // if there is not a check for article.description
        return(
          
          article.description.includes(this.props.teamName) || 
          article.title.includes(this.props.teamName)
        )
      }
    })

    this.convertDateToUserFriendly(parsedArticles)

    const formattedArticles = ( parsedArticles.map(article => {
      return(
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={article.urlToImage} />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
              <Card.Link href={article.url}>Link To Source</Card.Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card> 
        </Col>
      )
    }) )
  this.setState({formattedArticles});
  } 

  render() {
    return(
      <div>
      <button onClick={this.showArticles}>Show Articles</button>
    <CardDeck>
      <Row>
         {this.state.formattedArticles}
       </Row>
    </CardDeck>  
    </div>
    )
  }
}