import React, { Component } from 'react';
import './InfoPage.css';

export default class InfoPage extends Component {

  render() {
    return(
      <div className="infoPage">
        <ul>
          <li><h1>Welcome to the info page!</h1></li>
          <li><h2>More Will Follow</h2></li>
        </ul>
      </div>
    )
  }
}