import React, { Component } from 'react';
import { CardDeck, Card, Col, Row } from 'react-bootstrap'

export default class DisplayTeamArticles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedArticles: []
    }
  }

  // transposeDuplicates = (articles) => {
  //   let transposedArticles = [];
  //   transposedArticles.push(articles[0])
  //   console.log(articles)
  //   // O(n^2) run time
  //   for( let i = 0; i < articles.length; i++ ) {
  //       for( let j = 0; j < transposedArticles.length; j++ ) {
  //         if( transposedArticles[j].title !== articles[i].title ) {
  //           // I'll be back 
  //         }
  //       }
  //     }
  //   }
  //   // })
  // }

  convertDateToUserFriendly = (parsedArticles) => {
    const dateOnly = parsedArticles.map(article => {
      return(
        article.publishedAt.split('T')[0]
      )
    })
    const timeOnly = parsedArticles.map(article => {
      return(
        article.publishedAt.split('T')[1]
      )
    })

    console.log(timeOnly)
    console.log(dateOnly)

  }


  showArticles = () => {
    let parsedArticles = this.props.teamArticles.articles.filter(article =>  {
      if( article.description && article.title && article.content) { 
  // For some reason some of the articles description are not attributes so this code will break
  // if there is not a check for article.description
        return(
          
          article.description.includes(this.props.teamName) || 
          article.title.includes(this.props.teamName)
        )
      }
    })
    // let newparsedArticles = this.transposeDuplicates(parsedArticles)
    this.convertDateToUserFriendly(parsedArticles)

    const formattedArticles = ( parsedArticles.map( (article, ndx) => {
      return(
        <Col key={Date.now() + ndx} md={4}>
          <Card>
            <Card.Img variant="top" src={article.urlToImage} />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
              <Card.Link href={article.url}>Source: {article.source.name}</Card.Link>
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