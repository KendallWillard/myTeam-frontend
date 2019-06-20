import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class TeamModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.article)
    return(
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="modalContainer"
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {this.props.currentTeam}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">
        <h1>{this.props.article.title}</h1>
        <h3>{this.props.article.description}</h3>
        <a href={this.props.article.url}> Source: {this.props.article.source ? this.props.article.source.name : null} </a>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}
