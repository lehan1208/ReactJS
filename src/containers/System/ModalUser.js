import { set } from "lodash";
import React, { useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { emitter } from "../../utils/emitter";

function ModalUser({ isOpenModal, toggleAddNewModal, createNewUser }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
  });

  // const handleOnchangeInput = (e, id) => {
  //   //  BAD CODE

  //   // user[id] = e.target.value;
  //   // setUser({ ...user });
  //   // console.log("Check bad state: ", user);
  // GOOD CODE
  const handleOnchangeInput = (e, key) => {
    let newUser = { ...user };
    newUser[key] = e.target.value;
    setUser({ ...newUser });
  };

  // Validate Input
  const checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];

    for (let i = 0; i < arrInput.length; i++) {
      if (!user[arrInput[i]]) {
        isValid = false;
        alert("Please insert " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  const handleAddNewUser = () => {
    let isValid = checkValidateInput();
    if (isValid === true) {
      createNewUser(user);
      setUser({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    }
  };

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
                  value={user.email}
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => handleOnchangeInput(e, "email")}
                />
              </div>
              <div className="form-group mt-3 col-6">
                <label className="font-weight-bold mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  value={user.password}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleOnchangeInput(e, "password")}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group mt-3 col-6">
                <label className="font-weight-bold mb-1" htmlFor="firstName">
                  First Name
                </label>
                <input
                  value={user.firstName}
                  type="text"
                  className="form-control"
                  name="firstName"
                  onChange={(e) => handleOnchangeInput(e, "firstName")}
                />
              </div>
              <div className="form-group mt-3 col-6">
                <label className="font-weight-bold mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  value={user.lastName}
                  type="text"
                  className="form-control"
                  name="lastName"
                  onChange={(e) => handleOnchangeInput(e, "lastName")}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group mt-3 col">
                <label className="font-weight-bold mb-1" htmlFor="address">
                  Address
                </label>
                <input
                  value={user.address}
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={(e) => handleOnchangeInput(e, "address")}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            className="px-3 "
            onClick={() => handleAddNewUser()}
          >
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
