import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

function TableManageUser({ fetchUserRedux, UserRedux, deleteUserRedux }) {
  const [listUser, setListUser] = useState(UserRedux);

  useEffect(() => {
    async function fetchData() {
      fetchUserRedux();
      setListUser(UserRedux);
    }
    fetchData();
  }, []);

  const handleEditUser = (item) => {};

  const handleDeleteUser = (item) => {
    deleteUserRedux(item.id);
  };

  return (
    <table id='table-manage-user'>
      <tbody>
        <tr>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
        {UserRedux &&
          UserRedux.length > 0 &&
          UserRedux.map((item, index) => (
            <tr key={index}>
              <td>{item.email}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.address}</td>
              <td className='d-flex align-center'>
                <button
                  className='btn btn-edit'
                  onClick={() => handleEditUser(item)}
                >
                  <i className='fas fa-edit'></i>
                </button>
                <button
                  className=' btn-delete '
                  onClick={() => handleDeleteUser(item)}
                >
                  <i className='far fa-trash-alt'></i>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    UserRedux: state.admin.users, // ref => adminReducer.js (admin from rootReducer.js)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
