import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class TeamModal extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.show !== this.props.show) {
  //     this.props.openTheModal()
  //   }
  // }

  render() {
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
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">
        <h3>{this.props.article.title}</h3>
        <h5>{this.props.article.description}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}
