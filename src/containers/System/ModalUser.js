import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalUser({ isOpenModal, toggleAddNewModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

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
          <form>
            <div className="row">
              <div className="form-group mt-3 col-6">
                <label className="font-weight-bold mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  spellCheck="false"
                  value={email}
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3 col-6">
                <label className="font-weight-bold mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  value={password}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group mt-3 col-6">
                <label className="font-weight-bold mb-1" htmlFor="firstName">
                  First Name
                </label>
                <input
                  value={firstName}
                  type="text"
                  className="form-control"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3 col-6">
                <label className="font-weight-bold mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group mt-3 col">
                <label className="font-weight-bold mb-1" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {/* <div className="form-group mt-3 col-3">
                <label className="font-weight-bold mb-1" htmlFor="password">Select Gender</label>
                <select type="selected" className="form-control">
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <div className="form-group mt-3 col-3">
                <label className="font-weight-bold mb-1" htmlFor="role">Role</label>
                <input type="text" className="form-control" name="role" />
              </div> */}
            </div>

            {/* <button type="submit" className="btn btn-primary mt-3">
              Sign in
            </button> */}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggle()} className="px-3 ">
            Add New
          </Button>
          <Button onClick={() => toggle()} className="px-3 ">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalUser;
