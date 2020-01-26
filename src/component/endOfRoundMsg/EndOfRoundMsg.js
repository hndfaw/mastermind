import React, { Component } from "react";
import "./EndOfRoundMsg.css";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class EndOfRoundMsg extends Component {
  render() {
      const { openEndOfRoundMsg } = this.props;
    return (
      <div>
        <Modal
          size="md"
          show={openEndOfRoundMsg}
          onHide={() => this.props.updateOpenEndOfRoundMsg(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header>
            <Modal.Title>Round Over!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="settings-modal-body">
            
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EndOfRoundMsg;
