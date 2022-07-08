import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUser } from "../../services/userService";
import ModalUser from "./ModalUser";

// class UserManage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//   componentDidMount() {}

//   render() {
//     return ;
//   }
// }

function UserManage({ props }) {
  const [arrUsers, setArrUsers] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let res = await getAllUser("ALL");
      if (res && res.errCode === 0) {
        setArrUsers(res.users);
      }
      console.log(arrUsers);
      //   console.log("data from NodeJS: ", res);
    }
    fetchData();
  }, []);

  const handleAddNew = () => {
    setIsOpenModal(true);
  };

  const toggleAddNewModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className="user-container">
      <div className="title text-center">Manage user with Eric</div>
      <div className="mx-4 my-3">
        <button
          className="btn btn-med btn-primary text-sm px-2 add-new-btn"
          onClick={() => handleAddNew()}
        >
          <i className="fas fa-plus ml-5"></i>
          <span className="mx-2"> Add New User</span>
        </button>
        <ModalUser
          isOpenModal={isOpenModal}
          toggleAddNewModal={toggleAddNewModal}
        />
      </div>

      <div className="user-table mt-4 mx-4">
        <table id="customers">
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          {arrUsers &&
            arrUsers.map((item, index) => (
              <tr className="" key={index}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td className="d-flex align-center">
                  <button className="btn btn-edit">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button className=" btn-delete ">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
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

/** Lifecycle
 * When run the component
 * 1. Run constructor  => init state
 * 2 Did mount state
 * 3.Render component
 *
 *
 *
 */
