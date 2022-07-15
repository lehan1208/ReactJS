import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

function TableManageUser({ handleEditUserRedux, fetchUserRedux, userRedux, deleteUserRedux }) {
    const [listUser, setListUser] = useState();
    useEffect(() => {
        async function fetchData() {
            setListUser(userRedux);
            fetchUserRedux();
        }
        fetchData();
    }, []);

    const handleDeleteUser = (item) => {
        deleteUserRedux(item.id);
    };

    const handleEditUser = (user) => {
        handleEditUserRedux(user);
    };

    return (
        <>
            <table id='table-manage-user'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {userRedux &&
                        userRedux.length > 0 &&
                        userRedux.map((item, index) => (
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

            <MdEditor
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />  
        </>
    );  
}

const mdParser = new MarkdownIt(/* Markdown-it options */);
// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

const mapStateToProps = (state) => {
    return {
        userRedux: state.admin.users, // ref => adminReducer.js (admin from rootReducer.js)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
