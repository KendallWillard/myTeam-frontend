import React, { Component } from 'react';
import { CardDeck, Card, Col, Row, Container } from 'react-bootstrap'
import UserFavoriteTeams from './UserFavoriteTeams';
var moment = require('moment');


export default class DisplayTeamArticles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedArticles: [],
      teamName: this.props.teamName
    }
  }

  // transposeDuplicates = (articles) => {`
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

  // Format "2019-06-08T08:02:17-05:00" to user friendly format -> 
  // 
  convertDateToUserFriendly = (parsedArticles) => {
    parsedArticles.map(article => {
      return( 
        article.publishedAt = moment(article.publishedAt).utcOffset(-240).format('llll')
      )
    })
  }

  reMountComponent = () => {
    let parsedArticles = this.parseAllTheArticles();
    // let newparsedArticles = this.transposeDuplicates(parsedArticles)
    this.convertDateToUserFriendly(parsedArticles)
    const formattedArticles = this.formatArticles(parsedArticles)
    this.setState({formattedArticles});
  }

  // FIlter all the articles only for ones containing relevent team information
  parseAllTheArticles = () => {
    return(
      this.props.teamArticles.filter(article =>  {
        if( article.description && article.title && article.content && article.source.name !== 'Hvper.com') { 
    // For some reason some of the articles attributes are not valid so this code will break
    // if there is not a check for these attributes plus the spam ad check
          return(
            article.content.includes(this.props.teamName) ||
            article.description.includes(this.props.teamName) || 
            article.title.includes(this.props.teamName)
          )
        }
      return null
      })
    )
  } 

  formatArticles = (parsedArticles) => {
    return( 
      parsedArticles.map( (article, ndx) => {
        return(
          <Col key={Date.now() + ndx} md={4}>
            <Card>
              <Card.Img variant="top" src={article.urlToImage} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.content}</Card.Text>
                <Card.Link href={article.url}>Source: {article.source.name}</Card.Link>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last Updated: {article.publishedAt} Eastern</small>
              </Card.Footer>
            </Card> 
          </Col>
        )
      }) 
    ) 
  }

  componentDidMount() {
    let parsedArticles = this.parseAllTheArticles();
    // let newparsedArticles = this.transposeDuplicates(parsedArticles)
    this.convertDateToUserFriendly(parsedArticles)
    const formattedArticles = this.formatArticles(parsedArticles)
    this.setState({formattedArticles});
    }
  
  
  render() {
    return(
      <div>
        <UserFavoriteTeams 
        userTeams={this.props.userTeams} 
        changeCurrentTeam={this.props.changeCurrentTeam} 
        reMountComponent = {this.reMountComponent}
        />
        <CardDeck>
          <Row>
            {this.state.formattedArticles}
          </Row>
        </CardDeck>  
    </div>
    )
  }
}