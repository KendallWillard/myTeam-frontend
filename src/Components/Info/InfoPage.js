import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './InfoPage.css';


export default class InfoPage extends Component {
  render() {
    return(
      <div>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">My Teams</Navbar.Brand>
              <Nav className="mr-auto">
            <Button href="/home" variant="success">Back to Home</Button>
             </Nav>
          </Navbar>
        </div>
        <div className="infoPage">
          <ul>
            <li><h1>Welcome to the info page!</h1></li>

            <li><h2>To start. The first thing to do is add one of your favorite teams 
              from the top navbar. After selected, you'll be able to see their recent news,
              current scores, and upcoming games.</h2></li>
            <li><h2>The big rotating carousel at the top will display the most recent news article,
              from each of your favorite teams selected, on a rotating wheel. You can click on the carousel
              image to be taken directly to the source.
              </h2></li>
            <li><h2>The news article's appear in rows of 3 and these are displayed in most recent order
              that they were published. You can click on the image to open up a popup window that will
              show that news article in a larger text font and also give an option to go to that source's website 
              for the news article.
              </h2></li>
              <li><h2>On the bottom is a twitter, facebook, and reddit share button. These offer the opportunity 
                for you to share that current article with your friends and/or family on these social media platforms.
                You can also click on the source link near the bottom of the current article to be taken directly to that source.
                </h2></li>
              <li><h2>To the left of the news articles is the current scores box.
                This will show any upcoming games for that day or if a game is currently 
                going on it will display the score and what inning the game is in.</h2></li>
                <li><h2>Underneath the Current Scores Box is the list of upcoming games for that team.
                  This will display all the upcoming games within a week for that team.</h2></li>
                  <li><h2>To logout, you can hit the red logout button in the top right of the website.
                    If you are on a mobile device, you will have to turn the phone sideways to see 
                    the red logout button.</h2></li>

          </ul>
        </div>
      </div>

    )
  }
}