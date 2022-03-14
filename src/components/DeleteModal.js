import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteModal(props) {
  const { show, onCancel, onConfirm } = props;
  return (
    <Modal show={show} size="lg" centered variant="danger">
      <Modal.Body className="text-center text-primary-cstm ">
        <h4>Sicher?</h4>
        <p>Willst du dieses Projekt wirklich löschen?</p>
        <div className="d-flex justify-content-center">
          <Button
            onClick={ onCancel }
            variant="custom"
            className="bg-secondary-cstm text-white mx-2"
          >
            Abbrechen
          </Button>
          <Button
            onClick={ onConfirm }
            variant="custom"
            className="bg-error-cstm text-white mx-2"
          >
            Löschen
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
