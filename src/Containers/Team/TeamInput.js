import React from 'react';
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card, Container } from 'semantic-ui-react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

import apiConfig from '../../../apiKeys'
const FIRST_HALF_NEWS_URL = 'https://newsapi.org/v2/everything?q=',
      SECOND_HALF_NEWS_URL = `&sortBy=publishedAt&pageSize=100&apiKey=${apiConfig.newsApi}`,
      BASE_HOSTING_URL = `http://localhost:3001`


class TeamInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teamName: '',
      teamNews: []
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  fetchAndParseNewsArticles = () => {
    fetch(`${FIRST_HALF_NEWS_URL}${this.state.teamName}${SECOND_HALF_NEWS_URL}`)
    .then(response => response.json())
    .then(teamNews => this.setState({teamNews}) )
    .catch(console.error);
  }

  postNewTeamWithUser = (teamName) => {
    const { id, jwtToken } = this.props;
    const team = {
      name: teamName,
      city: teamName,
      description: teamName,
      user_id: id
    }
    fetch(`${BASE_HOSTING_URL}/users/${id}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({team})
    })
    .catch(console.error)
  }
  
  handleClick = (event) => {
    event.preventDefault();
    this.fetchAndParseNewsArticles();
  }

  parseNewsArticles = () => {
    const parsedArticles = this.state.teamNews.articles.filter(article => article.title.includes('Chiefs'));
    const allTheArticles = parsedArticles.map((article, ndx) => <Card header={article.title} description={article.description} fluid color='red' key={Date.now() + ndx} />);
    this.setState({allTheArticles});
  } 

  handleSelection = (event) => {
    this.postNewTeamWithUser(event.target.value)
  }


  render() {
    return (
      <div>
      <Container text>
        <TextField
          label="None"
          id="margin-none"
          helperText="Some important text"
          name="teamName"
          value={this.state.teamName}
          onChange={this.handleChange}
        />
        <Button 
          variant="contained" 
          color="primary"
          onClick={this.handleClick}
        >
          Add A Team
        </Button>
        <Button 
          variant="contained"
          onClick={this.parseNewsArticles}
        >
          Parse News Info
        </Button>
          {this.state.allTheArticles}
        </Container>
        <MDBDropdown>
      <MDBDropdownToggle caret color="primary">
        Select Favorite Team
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
      <MDBDropdown dropright>
          <MDBDropdownToggle caret color="warning">
            NFL
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdown dropright>
              <MDBDropdownToggle caret color="danger">
                AFC
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem>AFC West</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={this.handleSelection} value="Kansas City Chiefs" name="team">Kansas City Chiefs</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Denver Broncos" name="team">Denver Broncos</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Oakland Raiders" name="team">Oakland Raiders</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Los Angeles Chargers" name="team">Los Angeles Chargers</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>AFC East</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={this.handleSelection} value="New England Patriots" name="team">New England Patriots</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Miami Dolphins" name="team">Miami Dolphin</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Buffalo Bills" name="team">Buffalo Bills</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="New York Jets" name="team">New York Jets</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>AFC North</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={this.handleSelection} value="Baltimore ravens" name="team">Baltimore Ravens</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Pittsburgh Steelers" name="team">Pittsburgh Steelers</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Cleveland Browns" name="team">Cleveland Browns</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Cincinnati Bengals" name="team">Cincinnati Bengals</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>AFC South</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={this.handleSelection} value="Houston Texans" name="team">Houston Texans</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Indianapolis Colts" name="team">Indianapolis Colts</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Tennessee Titans" name="team">Tennessee Titans</MDBDropdownItem>
                <MDBDropdownItem onClick={this.handleSelection} value="Jacksonville Jaguars" name="team">Jacksonville Jaguars</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBDropdown dropright>
              <MDBDropdownToggle caret color="primary">
                NFC
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
              <MDBDropdownItem>NFC West</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem value="Los Angeles Rams"  onClick={this.handleSelection} name="team">Los Angeles Rams</MDBDropdownItem>
                <MDBDropdownItem value="Seattle Seahawks"  onClick={this.handleSelection} name="team">Seattle Seahawks</MDBDropdownItem>
                <MDBDropdownItem value="San Francisco 49ers"  onClick={this.handleSelection} name="team">San Francisco 49ers</MDBDropdownItem>
                <MDBDropdownItem value="Arizona Cardinals"  onClick={this.handleSelection} name="team">Arizona Cardinals</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>NFC East</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem value="Dallas Cowboys"  onClick={this.handleSelection} name="team">Dallas Cowboys</MDBDropdownItem>
                <MDBDropdownItem value="Philadelphia Eagles"  onClick={this.handleSelection} name="team">Philadelphia Eagles</MDBDropdownItem>
                <MDBDropdownItem value="Washington Redskins"  onClick={this.handleSelection} name="team">Washington Redskins</MDBDropdownItem>
                <MDBDropdownItem value="New York Giants"  onClick={this.handleSelection} name="team">New York Giants</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>NFC North</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem value="Chicago Bears"  onClick={this.handleSelection} name="team">Chicago Bears</MDBDropdownItem>
                <MDBDropdownItem value="Minnesota Vikings"  onClick={this.handleSelection} name="team">Minnesota Vikings</MDBDropdownItem>
                <MDBDropdownItem value="Green Bay Packers"  onClick={this.handleSelection} name="team">Green Bay Packers</MDBDropdownItem>
                <MDBDropdownItem value="Detroit Lions"  onClick={this.handleSelection} name="team">Detroit Lions</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>NFC South</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem value="New Orleans Saints"  onClick={this.handleSelection} name="team">New Orleans Saints</MDBDropdownItem>
                <MDBDropdownItem value="Atlanta Falcons"  onClick={this.handleSelection} name="team">Atlanta Falcons</MDBDropdownItem>
                <MDBDropdownItem value="Carolina Panthers"  onClick={this.handleSelection} name="team">Carolina Panthers</MDBDropdownItem>
                <MDBDropdownItem value="Tampa Bay Buccaneers"  onClick={this.handleSelection} name="team">Tampa Bay Buccaneers</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBDropdown dropright>
          <MDBDropdownToggle caret color="success">
            NBA
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdown dropright>
              <MDBDropdownToggle caret color="primary">
                East
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem value="Milwaukee Bucks"  onClick={this.handleSelection} name="team" >Milwaukee Bucks</MDBDropdownItem>
                <MDBDropdownItem value="Toronto Raptors"  onClick={this.handleSelection} name="team" >Toronto Raptors</MDBDropdownItem>
                <MDBDropdownItem value="Philadelphia 76ers"  onClick={this.handleSelection} name="team" >Philadelphia 76ers</MDBDropdownItem>
                <MDBDropdownItem value="Boston Celtics"  onClick={this.handleSelection} name="team" >Boston Celtics</MDBDropdownItem>
                <MDBDropdownItem value="Indiana Pacers"  onClick={this.handleSelection} name="team" >Indiana Pacers</MDBDropdownItem>
                <MDBDropdownItem value="Brooklyn Nets"  onClick={this.handleSelection} name="team" >Brooklyn Nets</MDBDropdownItem>
                <MDBDropdownItem value="Orlando Magic"  onClick={this.handleSelection} name="team" >Orlando Magic</MDBDropdownItem>
                <MDBDropdownItem value="Detroit Pistons"  onClick={this.handleSelection} name="team" >Detroit Pistons</MDBDropdownItem>
                <MDBDropdownItem value="Charlotte Hornets"  onClick={this.handleSelection} name="team" >Charlotte Hornets</MDBDropdownItem>
                <MDBDropdownItem value="Miami Heat"  onClick={this.handleSelection} name="team" >Miami Heat</MDBDropdownItem>
                <MDBDropdownItem value="Washington Wizards"  onClick={this.handleSelection} name="team" >Washington Wizards</MDBDropdownItem>
                <MDBDropdownItem value="Atlanta Hawks"  onClick={this.handleSelection} name="team" >Atlanta Hawks</MDBDropdownItem>
                <MDBDropdownItem value="Chicago Bulls"  onClick={this.handleSelection} name="team" >Chicago Bulls</MDBDropdownItem>
                <MDBDropdownItem value="Cleveland Cavaliers"  onClick={this.handleSelection} name="team" >Cleveland Cavaliers</MDBDropdownItem>
                <MDBDropdownItem value="New York Knicks"  onClick={this.handleSelection} name="team" >New York Knicks</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBDropdown dropright>
              <MDBDropdownToggle caret color="danger">
                West
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem value="Golden State Warriors"  onClick={this.handleSelection} name="team" >Golden State Warriors</MDBDropdownItem>
                <MDBDropdownItem value="Denver Nuggets"  onClick={this.handleSelection} name="team" >Denver Nuggets</MDBDropdownItem>
                <MDBDropdownItem value="Portland Trail Blazers"  onClick={this.handleSelection} name="team" >Portland Trail Blazers</MDBDropdownItem>
                <MDBDropdownItem value="Houston Rockets"  onClick={this.handleSelection} name="team" >Houston Rockets</MDBDropdownItem>
                <MDBDropdownItem value="Utah Jazz"  onClick={this.handleSelection} name="team" >Utah Jazz</MDBDropdownItem>
                <MDBDropdownItem value="Oklahoma City Thunder"  onClick={this.handleSelection} name="team" >Oklahoma City Thunder</MDBDropdownItem>
                <MDBDropdownItem value="San Antonio Spurs"  onClick={this.handleSelection} name="team" >San Antonio Spurs</MDBDropdownItem>
                <MDBDropdownItem value="Los Angeles Clippers"  onClick={this.handleSelection} name="team" >Los Angeles Clippers</MDBDropdownItem>
                <MDBDropdownItem value="Sacramento Kings"  onClick={this.handleSelection} name="team" >Sacramento Kings</MDBDropdownItem>
                <MDBDropdownItem value="Los Angeles Lakers"  onClick={this.handleSelection} name="team" >Los Angeles Lakers</MDBDropdownItem>
                <MDBDropdownItem value="Minnesota Timberwolves"  onClick={this.handleSelection} name="team" >Minnesota Timberwolves</MDBDropdownItem>
                <MDBDropdownItem value="Memphis Grizzlies"  onClick={this.handleSelection} name="team" >Memphis Grizzlies</MDBDropdownItem>
                <MDBDropdownItem value="New Orleans Pelicans"  onClick={this.handleSelection} name="team" >New Orleans Pelicans</MDBDropdownItem>
                <MDBDropdownItem value="Dallas Mavericks"  onClick={this.handleSelection} name="team" >Dallas Mavericks</MDBDropdownItem>
                <MDBDropdownItem value="Phoenix Suns"  onClick={this.handleSelection} name="team" >Phoenix Suns</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBDropdown dropright>
          <MDBDropdownToggle caret color="info">
            MLB
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdown dropright>
              <MDBDropdownToggle caret color="danger">
                American
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem>East</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="New York Yankees" >New York Yankees</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Tampa Bay Rays">Tampa Bay Rays</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Boston Red Sox">Boston Red Sox</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Toronto Blue Jays">Toronto Blue Jays</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Baltimore Orioles">Baltimore Orioles</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>Central</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Minnesota Twins">Minnesota Twins</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Cleveland Indians">Cleveland Indians</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Chicago White Sox">Chicago White Sox</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Detroirt Tigers">Detroirt Tigers</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Kansas City Royals">Kansas City Royals</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>West</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Houston Astros">Houston Astros</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Texas Ranger">Texas Ranger</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Oakland Athletics">Oakland Athletics</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Los Angeles Angels">Los Angeles Angels</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Seattle Mariners">Seattle Mariners</MDBDropdownItem>
                <MDBDropdownItem divider />
              </MDBDropdownMenu>
            </MDBDropdown>
              <MDBDropdown dropright>
                <MDBDropdownToggle caret color="primary">
                  National
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                <MDBDropdownItem>East</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Philadelphia Phillies">Philadelphia Phillies</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Atlanta Braves">Atlanta Braves</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="New York Mets">New York Mets</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Washington Nationals">Washington Nationals</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Miami Marlins">Miami Marlins</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>Central</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Chicago Cubs">Chicago Cubs</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Milwaukee Brewers">Milwaukee Brewers</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="St. Louis Cardinals">St. Louis Cardinals</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Pittsburgh Pirates">Pittsburgh Pirates</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Cincinnati Reds">Cincinnati Reds</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>West</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Los Angeles Dodgers">Los Angeles Dodgers</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Colorado Rockies">Colorado Rockies</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="San Diego Padres">San Diego Padres</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Arizona Diamondbacks">Arizona Diamondbacks</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="San Francisco Giants">San Francisco Giants</MDBDropdownItem>
                <MDBDropdownItem divider />
                </MDBDropdownMenu>
              </MDBDropdown>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBDropdown dropright>
          <MDBDropdownToggle caret color="primary">
            MLS
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdown dropright>
              <MDBDropdownToggle caret color="primary">
                East
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Philadelphia Union" >Philadelphia Union</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="DC United" >DC United</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Atlanta United FC" >Atlanta United FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="New York Red Bulls" >New York Red Bulls</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Montreal Impact" >Montreal Impact</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="New York City FC" >New York City FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Toronto FC" >Toronto FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Orlando City SC" >Orlando City SC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Chicago Fire" >Chicago Fire</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Columbus Crew SC" >Columbus Crew SC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="New England Revolution" >New England Revolution</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="FC Cincinnati" >FC Cincinnati</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
              <MDBDropdown dropright>
                <MDBDropdownToggle caret color="danger">
                  West
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="LAFC" >LAFC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="LA Galaxy" >LA Galaxy</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Seattle Sounders FC" >Seattle Sounders FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Houston Dynamo" >Houston Dynamo</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="FC Dallas" >FC Dallas</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Minnesota United FC" >Minnesota United FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Real Salt Lake" >Real Salt Lake</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="San Jose Earthquakes" >San Jose Earthquakes</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Vancouver Whitecaps" >Vancouver Whitecaps</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Sporting Kansas City" >Sporting Kansas City</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Portland Timbers" >Portland Timbers</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.handleSelection} name="team" value="Colorado Rapids" >Colorado Rapids</MDBDropdownItem>
                </MDBDropdownMenu>
             </MDBDropdown>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBDropdownMenu>
    </MDBDropdown>
        </div>
    );
  }
}

const mapStateToProps = state => (
  {
  id: state.user.id,
  jwtToken: state.user.jwtToken
})

export default connect( mapStateToProps, null)(TeamInput)