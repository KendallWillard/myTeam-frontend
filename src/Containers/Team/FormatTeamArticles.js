import React, { Component } from 'react';
import { CardDeck, Card, Col, Row } from 'react-bootstrap'
import UserFavoriteTeams from './UserFavoriteTeams';
import { Facebook, Reddit, Twitter } from 'react-sharingbuttons';
import TeamModal from './TeamModal';
import 'react-sharingbuttons/dist/main.css';
import './Team.css';
const moment = require('moment');


export default class FormatTeamArticles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedArticles: [],
      teamName: this.props.teamName,
      showTwitterSharePage: true,
      modalShow: false,
      currentArticle: {}
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

  // Format "2019-06-08T08:02:17-05:00" to user friendly format -> 
  // 
  convertDateToUserFriendly = (parsedArticles) => {
    parsedArticles.map(article => {
      return( 
        article.publishedAt = moment(article.publishedAt).utcOffset(-300).format('llll')
      )
    })
  }

  // componentDidUpdate(prevState) {

  // }


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
          <Col key={Date.now() + ndx} md={4} id="cardContainer">
            <Card>
              <Card.Img id="cardImage"  variant="top" src={article.urlToImage}  onClick={() => this.openModal(article)}/>
              <Card.Body>
                <Card.Title>{article.title} </Card.Title>
                <Card.Text id="cardText">{article.content}</Card.Text>
                <Card.Link href={article.url}>Source: {article.source.name}</Card.Link>
              </Card.Body>
              <Card.Footer>
                <Twitter url={article.url} text="Share"/>
                <Facebook url={article.url} text="Share"/>
                <Reddit url={article.url} text="Share"/> <br></br>
                <small className="text-muted">Last Updated: {article.publishedAt} Central</small>
              </Card.Footer>
            </Card> 
          </Col>
          
        )
      }) 
    ) 
  }

  modalClose = (event) => {
    this.setState({modalShow: false})
    
  }

  openModal = (article) => {
    this.setState({modalShow: true, currentArticle: article})
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
        reMountComponent={this.reMountComponent}
        />
        <TeamModal 
        currentTeam={this.props.teamName}
        show={this.state.modalShow} 
        onHide={this.modalClose}
        article={this.state.currentArticle}
        // openTheModal={this.openModal}
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