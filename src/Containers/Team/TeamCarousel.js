import React from 'react';
import { Carousel } from 'react-bootstrap';
import apiConfig from '../../apiKeys';
import './Team.css';
const FIRST_HALF_NEWS_URL = 'https://newsapi.org/v2/everything?q=',
      SECOND_HALF_NEWS_URL = `&sortBy=publishedAt&pageSize=50&apiKey=${apiConfig.newsApiTwo}`;


class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
      direction: null,
      userMostRecentTeamsNews: '',
      formattedCarousel: []
    };
  }

  formatTheCarousel = () => {
    const formattedCarousel = this.state.userMostRecentTeamsNews.map(team => {
      return(
        <Carousel.Item>
          <a href={team.url} key={team.id}>
            <img
              id="carousel-image"
              className="d-block w-100"
              src={team.urlToImage}
              alt="First slide"
            />
          </a>
          <Carousel.Caption>
            <h1 id="titleText">{team.title}</h1>
            <h3 id="descriptionText">{team.description}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      )
    })
    this.setState({formattedCarousel})
  }

  // Filter all the articles only for ones containing relevent team information
  parseAndStoreMostRecentNewsArticle = (newsArticles, teamName) => {
    const filteredArticles = newsArticles.articles.filter(article =>  {
        if( article.description && article.title && article.content && article.source.name !== 'Hvper.com') { 
        // For some reason some of the articles attributes are not valid so this code will break
        // if there is not a check for these attributes plus the spam ad check
          return(
            article.content.includes(teamName) ||
            article.description.includes(teamName) || 
            article.title.includes(teamName)
          )
        }
      return null
      })

    this.setState(state => {
      const userMostRecentTeamsNews = [...state.userMostRecentTeamsNews, filteredArticles[0]]
      return {userMostRecentTeamsNews}
    })
  } 

  fetchUserTeamsMostRecentStory = () => {
    this.props.userTeams.map((userTeam, ndx) => {
      return fetch(`${FIRST_HALF_NEWS_URL}${userTeam.name}${SECOND_HALF_NEWS_URL}`)
      .then(response => response.json())
      .then(newsArticles => this.parseAndStoreMostRecentNewsArticle(newsArticles, userTeam.name))
      .then(this.formatTheCarousel)
      .catch(console.error)
    })
  }

  componentDidMount() {
    this.fetchUserTeamsMostRecentStory();
    
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const { index, direction } = this.state;
    return (
      <Carousel
      activeIndex={index}
      direction={direction}
      onSelect={this.handleSelect}
      >
       {this.state.formattedCarousel}
       </Carousel>
    );
  }
}

export default ControlledCarousel