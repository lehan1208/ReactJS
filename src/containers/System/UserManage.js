import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
// import { emitter } from "../../utils/emitter";

function UserManage({ props }) {
  const [arrUsers, setArrUsers] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const fetchData = async () => {
    let res = await getAllUser('ALL');
    if (res && res.errCode === 0) {
      setArrUsers(res.users);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddNew = () => {
    setIsOpenModal(true);
  };

  const toggleAddNewModal = () => {
    setIsOpenModal(false);
  };

  const toggleModalEditUser = () => {
    setIsOpenEditModal(false);
  };

  const createNewUser = async (newUserData) => {
    try {
      let res = await createNewUserService(newUserData);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await fetchData();
        setIsOpenModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await fetchData();
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditUser = (user) => {
    console.log('check edit user: ', user);
    setIsOpenEditModal(!isOpenEditModal);
    setUserEdit(user);
  };

  const editUser = async (userData) => {
    try {
      let res = await editUserService(userData);
      if (res && res.errCode === 0) {
        await fetchData();
        setIsOpenEditModal(false);
        console.log(res);
      } else {
        alert(res.errMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='user-container'>
      <div className='title text-center'>MANAGE USERS LIST</div>
      <div className='mx-4 my-3'>
        <button
          className='btn btn-med btn-primary text-sm px-2 add-new-btn'
          onClick={() => handleAddNew()}
          autoFocus={false}
        >
          <i className='fas fa-plus'></i>
          <span className='mx-2'> Add New User</span>
        </button>
        <ModalUser
          isOpenModal={isOpenModal}
          toggleAddNewModal={toggleAddNewModal}
          createNewUser={createNewUser}
        />
        {isOpenEditModal && (
          <ModalEditUser
            isOpenModal={isOpenEditModal}
            toggleModalEditUser={toggleModalEditUser}
            userEdit={userEdit}
            editUser={editUser}
          />
        )}
      </div>

      <div className='user-table mt-4 mx-4'>
        <table id='customers'>
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

            {arrUsers &&
              arrUsers.map((user, index) => (
                <tr className='' key={index}>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>

                  <td className='d-flex align-center'>
                    <button
                      className='btn btn-edit'
                      onClick={() => handleEditUser(user)}
                    >
                      <i className='fas fa-edit'></i>
                    </button>
                    <button
                      className=' btn-delete '
                      onClick={() => handleDeleteUser(user)}
                    >
                      <i className='far fa-trash-alt'></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
