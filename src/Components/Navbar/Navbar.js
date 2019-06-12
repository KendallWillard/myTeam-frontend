import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { Redirect } from 'react-router-dom';
import './Navbar.css';

export default class myNavbar extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      redirectToLogin: false
    }
  }



  redirectToLogin = () => {
    this.setState({redirectToLogin: true});
  }


  logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('jwtToken')
    this.redirectToLogin();
  }

  render() {
    if(this.state.redirectToLogin) {
      return <Redirect to="/login" />
    }
    return(
      <Navbar fixed="top">
      <Navbar.Brand id="navbarContainer" href="/home">My Teams</Navbar.Brand>
      <Nav className="mr-auto">
        <Button id="homeButton" variant="success" href='/home' >Home</Button>
        <Button id="homeButton" variant="warning" href='/info' >Info</Button>
        <MDBDropdown>
      <MDBDropdownToggle id="homeButton" caret color="primary">
        Add a Favorite Team
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
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
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="New York Yankees" >New York Yankees</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Tampa Bay Rays">Tampa Bay Rays</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Boston Red Sox">Boston Red Sox</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Toronto Blue Jays">Toronto Blue Jays</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Baltimore Orioles">Baltimore Orioles</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>Central</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Minnesota Twins">Minnesota Twins</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Cleveland Indians">Cleveland Indians</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Chicago White Sox">Chicago White Sox</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Detroirt Tigers">Detroirt Tigers</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Kansas City Royals">Kansas City Royals</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>West</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Houston Astros">Houston Astros</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Texas Ranger">Texas Ranger</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Oakland Athletics">Oakland Athletics</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Los Angeles Angels">Los Angeles Angels</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Seattle Mariners">Seattle Mariners</MDBDropdownItem>
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
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Philadelphia Phillies">Philadelphia Phillies</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Atlanta Braves">Atlanta Braves</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="New York Mets">New York Mets</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Washington Nationals">Washington Nationals</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Miami Marlins">Miami Marlins</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>Central</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Chicago Cubs">Chicago Cubs</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Milwaukee Brewers">Milwaukee Brewers</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="St. Louis Cardinals">St. Louis Cardinals</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Pittsburgh Pirates">Pittsburgh Pirates</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Cincinnati Reds">Cincinnati Reds</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>West</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Los Angeles Dodgers">Los Angeles Dodgers</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Colorado Rockies">Colorado Rockies</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="San Diego Padres">San Diego Padres</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Arizona Diamondbacks">Arizona Diamondbacks</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="San Francisco Giants">San Francisco Giants</MDBDropdownItem>
                <MDBDropdownItem divider />
                </MDBDropdownMenu>
              </MDBDropdown>
          </MDBDropdownMenu>
        </MDBDropdown>
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
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Kansas City Chiefs" name="team">Kansas City Chiefs</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Denver Broncos" name="team">Denver Broncos</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Oakland Raiders" name="team">Oakland Raiders</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Los Angeles Chargers" name="team">Los Angeles Chargers</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>AFC East</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="New England Patriots" name="team">New England Patriots</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Miami Dolphins" name="team">Miami Dolphin</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Buffalo Bills" name="team">Buffalo Bills</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="New York Jets" name="team">New York Jets</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>AFC North</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Baltimore ravens" name="team">Baltimore Ravens</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Pittsburgh Steelers" name="team">Pittsburgh Steelers</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Cleveland Browns" name="team">Cleveland Browns</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Cincinnati Bengals" name="team">Cincinnati Bengals</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>AFC South</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Houston Texans" name="team">Houston Texans</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Indianapolis Colts" name="team">Indianapolis Colts</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Tennessee Titans" name="team">Tennessee Titans</MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.handleTeamSelection} value="Jacksonville Jaguars" name="team">Jacksonville Jaguars</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBDropdown dropright>
              <MDBDropdownToggle caret color="primary">
                NFC
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
              <MDBDropdownItem>NFC West</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem value="Los Angeles Rams"  onClick={this.props.handleTeamSelection} name="team">Los Angeles Rams</MDBDropdownItem>
                <MDBDropdownItem value="Seattle Seahawks"  onClick={this.props.handleTeamSelection} name="team">Seattle Seahawks</MDBDropdownItem>
                <MDBDropdownItem value="San Francisco 49ers"  onClick={this.props.handleTeamSelection} name="team">San Francisco 49ers</MDBDropdownItem>
                <MDBDropdownItem value="Arizona Cardinals"  onClick={this.props.handleTeamSelection} name="team">Arizona Cardinals</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>NFC East</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem value="Dallas Cowboys"  onClick={this.props.handleTeamSelection} name="team">Dallas Cowboys</MDBDropdownItem>
                <MDBDropdownItem value="Philadelphia Eagles"  onClick={this.props.handleTeamSelection} name="team">Philadelphia Eagles</MDBDropdownItem>
                <MDBDropdownItem value="Washington Redskins"  onClick={this.props.handleTeamSelection} name="team">Washington Redskins</MDBDropdownItem>
                <MDBDropdownItem value="New York Giants"  onClick={this.props.handleTeamSelection} name="team">New York Giants</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>NFC North</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem value="Chicago Bears"  onClick={this.props.handleTeamSelection} name="team">Chicago Bears</MDBDropdownItem>
                <MDBDropdownItem value="Minnesota Vikings"  onClick={this.props.handleTeamSelection} name="team">Minnesota Vikings</MDBDropdownItem>
                <MDBDropdownItem value="Green Bay Packers"  onClick={this.props.handleTeamSelection} name="team">Green Bay Packers</MDBDropdownItem>
                <MDBDropdownItem value="Detroit Lions"  onClick={this.props.handleTeamSelection} name="team">Detroit Lions</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>NFC South</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem value="New Orleans Saints"  onClick={this.props.handleTeamSelection} name="team">New Orleans Saints</MDBDropdownItem>
                <MDBDropdownItem value="Atlanta Falcons"  onClick={this.props.handleTeamSelection} name="team">Atlanta Falcons</MDBDropdownItem>
                <MDBDropdownItem value="Carolina Panthers"  onClick={this.props.handleTeamSelection} name="team">Carolina Panthers</MDBDropdownItem>
                <MDBDropdownItem value="Tampa Bay Buccaneers"  onClick={this.props.handleTeamSelection} name="team">Tampa Bay Buccaneers</MDBDropdownItem>
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
                <MDBDropdownItem value="Milwaukee Bucks"  onClick={this.props.handleTeamSelection} name="team" >Milwaukee Bucks</MDBDropdownItem>
                <MDBDropdownItem value="Toronto Raptors"  onClick={this.props.handleTeamSelection} name="team" >Toronto Raptors</MDBDropdownItem>
                <MDBDropdownItem value="Philadelphia 76ers"  onClick={this.props.handleTeamSelection} name="team" >Philadelphia 76ers</MDBDropdownItem>
                <MDBDropdownItem value="Boston Celtics"  onClick={this.props.handleTeamSelection} name="team" >Boston Celtics</MDBDropdownItem>
                <MDBDropdownItem value="Indiana Pacers"  onClick={this.props.handleTeamSelection} name="team" >Indiana Pacers</MDBDropdownItem>
                <MDBDropdownItem value="Brooklyn Nets"  onClick={this.props.handleTeamSelection} name="team" >Brooklyn Nets</MDBDropdownItem>
                <MDBDropdownItem value="Orlando Magic"  onClick={this.props.handleTeamSelection} name="team" >Orlando Magic</MDBDropdownItem>
                <MDBDropdownItem value="Detroit Pistons"  onClick={this.props.handleTeamSelection} name="team" >Detroit Pistons</MDBDropdownItem>
                <MDBDropdownItem value="Charlotte Hornets"  onClick={this.props.handleTeamSelection} name="team" >Charlotte Hornets</MDBDropdownItem>
                <MDBDropdownItem value="Miami Heat"  onClick={this.props.handleTeamSelection} name="team" >Miami Heat</MDBDropdownItem>
                <MDBDropdownItem value="Washington Wizards"  onClick={this.props.handleTeamSelection} name="team" >Washington Wizards</MDBDropdownItem>
                <MDBDropdownItem value="Atlanta Hawks"  onClick={this.props.handleTeamSelection} name="team" >Atlanta Hawks</MDBDropdownItem>
                <MDBDropdownItem value="Chicago Bulls"  onClick={this.props.handleTeamSelection} name="team" >Chicago Bulls</MDBDropdownItem>
                <MDBDropdownItem value="Cleveland Cavaliers"  onClick={this.props.handleTeamSelection} name="team" >Cleveland Cavaliers</MDBDropdownItem>
                <MDBDropdownItem value="New York Knicks"  onClick={this.props.handleTeamSelection} name="team" >New York Knicks</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBDropdown dropright>
              <MDBDropdownToggle caret color="danger">
                West
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem value="Golden State Warriors"  onClick={this.props.handleTeamSelection} name="team" >Golden State Warriors</MDBDropdownItem>
                <MDBDropdownItem value="Denver Nuggets"  onClick={this.props.handleTeamSelection} name="team" >Denver Nuggets</MDBDropdownItem>
                <MDBDropdownItem value="Portland Trail Blazers"  onClick={this.props.handleTeamSelection} name="team" >Portland Trail Blazers</MDBDropdownItem>
                <MDBDropdownItem value="Houston Rockets"  onClick={this.props.handleTeamSelection} name="team" >Houston Rockets</MDBDropdownItem>
                <MDBDropdownItem value="Utah Jazz"  onClick={this.props.handleTeamSelection} name="team" >Utah Jazz</MDBDropdownItem>
                <MDBDropdownItem value="Oklahoma City Thunder"  onClick={this.props.handleTeamSelection} name="team" >Oklahoma City Thunder</MDBDropdownItem>
                <MDBDropdownItem value="San Antonio Spurs"  onClick={this.props.handleTeamSelection} name="team" >San Antonio Spurs</MDBDropdownItem>
                <MDBDropdownItem value="Los Angeles Clippers"  onClick={this.props.handleTeamSelection} name="team" >Los Angeles Clippers</MDBDropdownItem>
                <MDBDropdownItem value="Sacramento Kings"  onClick={this.props.handleTeamSelection} name="team" >Sacramento Kings</MDBDropdownItem>
                <MDBDropdownItem value="Los Angeles Lakers"  onClick={this.props.handleTeamSelection} name="team" >Los Angeles Lakers</MDBDropdownItem>
                <MDBDropdownItem value="Minnesota Timberwolves"  onClick={this.props.handleTeamSelection} name="team" >Minnesota Timberwolves</MDBDropdownItem>
                <MDBDropdownItem value="Memphis Grizzlies"  onClick={this.props.handleTeamSelection} name="team" >Memphis Grizzlies</MDBDropdownItem>
                <MDBDropdownItem value="New Orleans Pelicans"  onClick={this.props.handleTeamSelection} name="team" >New Orleans Pelicans</MDBDropdownItem>
                <MDBDropdownItem value="Dallas Mavericks"  onClick={this.props.handleTeamSelection} name="team" >Dallas Mavericks</MDBDropdownItem>
                <MDBDropdownItem value="Phoenix Suns"  onClick={this.props.handleTeamSelection} name="team" >Phoenix Suns</MDBDropdownItem>
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
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Philadelphia Union" >Philadelphia Union</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="DC United" >DC United</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Atlanta United FC" >Atlanta United FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="New York Red Bulls" >New York Red Bulls</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Montreal Impact" >Montreal Impact</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="New York City FC" >New York City FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Toronto FC" >Toronto FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Orlando City SC" >Orlando City SC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Chicago Fire" >Chicago Fire</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Columbus Crew SC" >Columbus Crew SC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="New England Revolution" >New England Revolution</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="FC Cincinnati" >FC Cincinnati</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
              <MDBDropdown dropright>
                <MDBDropdownToggle caret color="danger">
                  West
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="LAFC" >LAFC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="LA Galaxy" >LA Galaxy</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Seattle Sounders FC" >Seattle Sounders FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Houston Dynamo" >Houston Dynamo</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="FC Dallas" >FC Dallas</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Minnesota United FC" >Minnesota United FC</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Real Salt Lake" >Real Salt Lake</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="San Jose Earthquakes" >San Jose Earthquakes</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Vancouver Whitecaps" >Vancouver Whitecaps</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Sporting Kansas City" >Sporting Kansas City</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Portland Timbers" >Portland Timbers</MDBDropdownItem>
                <MDBDropdownItem  onClick={this.props.handleTeamSelection} name="team" value="Colorado Rapids" >Colorado Rapids</MDBDropdownItem>
                </MDBDropdownMenu>
             </MDBDropdown>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBDropdownMenu>
    </MDBDropdown>
      </Nav>
      <Form inline>
        <Button variant="danger" onClick={this.logout} >Logout</Button>
      </Form>
    </Navbar>
    )
  }
}