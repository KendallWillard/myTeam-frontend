import React from 'react';
import { Carousel } from 'react-bootstrap';
import apiConfig from '../../apiKeys';
const FIRST_HALF_NEWS_URL = 'https://newsapi.org/v2/everything?q=',
      SECOND_HALF_NEWS_URL = `&sortBy=publishedAt&pageSize=50&apiKey=${apiConfig.newsApi}`;


class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
      direction: null,
      userMostRecentTeamsNews: []
    };
  }

  formatTheCarousel = () => {
    return(
      <Carousel
      activeIndex={this.state.index}
      direction={this.state.direction}
      onSelect={this.handleSelect}
      >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://timedotcom.files.wordpress.com/2019/01/patrick-mahomes.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
    )
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
    console.log('filtered', filteredArticles)
    this.setState({
      userMostRecentTeamsNews: filteredArticles[0]
    })
  } 

  fetchUserTeamsMostRecentStory = () => {
    this.props.userTeams.map((userTeam, ndx) => {
      fetch(`${FIRST_HALF_NEWS_URL}${userTeam.name}${SECOND_HALF_NEWS_URL}`)
      .then(response => response.json())
      .then(newsArticles => this.parseAndStoreMostRecentNewsArticle(newsArticles, userTeam.name))
      .then(console.log)
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
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://timedotcom.files.wordpress.com/2019/01/patrick-mahomes.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://timedotcom.files.wordpress.com/2019/01/patrick-mahomes.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://timedotcom.files.wordpress.com/2019/01/patrick-mahomes.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default ControlledCarousel