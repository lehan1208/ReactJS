import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalUser({ isOpenModal, toggleAddNewModal }) {
  const toggle = () => {
    toggleAddNewModal();
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        toggle={() => toggle()}
        size="lg"
        centered
        className="add-new-modal"
      >
        <ModalHeader toggle={() => toggle()}>Create New User</ModalHeader>
        <ModalBody>
          <div className="input-container">
            <label name="email">Email</label>
            <input type="text" name="email" />
          </div>
          <div className="input-container">
            <label name="password">Password</label>
            <input type="text" name="password" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggle()}></Button>{" "}
          <Button onClick={() => toggle()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalUser;
