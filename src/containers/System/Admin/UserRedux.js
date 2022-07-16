import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { CRUD_ACTION, LANGUAGES, CommonUtils } from '../../../utils/';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';

function UserRedux(props) {
    const {
        getGenderStart,
        genderRedux,
        getPositionStart,
        positionRedux,
        getRoleStart,
        roleRedux,
        createNewUser,
        // fetchUserRedux,
        UserRedux,
        editUser,
    } = props;

    const [previewImage, setPreviewImage] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [action, setAction] = useState(CRUD_ACTION.CREATE);
    const [userEditId, setUserEditId] = useState('');

    const [user, setUser] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: '',
        positionId: '',
        roleId: '',
        image: '',
    });

    useEffect(() => {
        setUser((prev) => ({ ...prev, gender: genderRedux[0]?.keyMap }));
    }, [genderRedux]);

    useEffect(() => {
        setUser((prev) => ({ ...prev, positionId: positionRedux[0]?.keyMap }));
    }, [positionRedux]);

    useEffect(() => {
        setUser((prev) => ({ ...prev, roleId: roleRedux[0]?.keyMap }));
    }, [roleRedux]);
    useEffect(() => {
        setUser((prev) => ({ ...prev, image: avatar }));
    }, [avatar]);

    useEffect(() => {
        async function fetchData() {
            getGenderStart();
            getPositionStart();
            getRoleStart();
        }
        fetchData();
    }, []);

    const handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewImage(objectUrl);
            setAvatar(base64);
        }
    };

    const openPreviewImage = () => {
        if (!previewImage) {
            return;
        } else {
            setIsOpen(true);
        }
    };

    const checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let isValid = true;

        for (let i = 0; i < arrCheck.length; i++) {
            if (!user[arrCheck[i]]) {
                isValid = false;
                alert('This input is required ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    const handleOnchangeInput = (e, key) => {
        const newUser = { ...user };
        newUser[key] = e.target.value;
        setUser({ ...newUser });
    };

    const handleSaveUser = (e) => {
        e.preventDefault();
        let isValid = checkValidateInput();
        if (isValid === false) return;
        // Fire redux

        if (action === CRUD_ACTION.CREATE) {
            createNewUser({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                gender: user.gender,
                positionId: user.positionId,
                roleId: user.roleId,
                image: avatar,
            });
        }

        if (action === CRUD_ACTION.EDIT) {
            editUser({
                id: userEditId,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                gender: user.gender,
                positionId: user.positionId,
                roleId: user.roleId,
                image: avatar,
            });
        }

        if (UserRedux !== user) {
            setUser({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: genderRedux[0]?.keyMap,
                positionId: positionRedux[0]?.keyMap,
                roleId: roleRedux[0]?.keyMap,
                image: '',
            });
            setAvatar('');
            setPreviewImage(null);
        }
        setAction(CRUD_ACTION.CREATE);
    };

    const handleEditUserRedux = (item) => {
        console.log('🚀 ~ file: UserRedux.js ~ line 166 ~ handleEditUserRedux ~ item', item);
        let imageBase64 = '';
        if (item.image) {
            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
        }
        setUser({
            email: item.email,
            password: '123456',
            firstName: item.firstName,
            lastName: item.lastName,
            phoneNumber: item.phoneNumber,
            address: item.address,
            gender: item.gender,
            positionId: item.positionId,
            roleId: item.roleId,
            image: '',
        });
        setUserEditId(item.id);
        setAction(CRUD_ACTION.EDIT);
        setPreviewImage(imageBase64);
    };
    const language = props.language;

    return (
        <div className='user-redux-container'>
            <div className='title'>Quản lý người dùng hệ thống</div>
            <div className='user-redux-body'>
                {isOpen && (
                    <Lightbox mainSrc={previewImage} onCloseRequest={() => setIsOpen(false)} />
                )}

                <div className='container'>
                    <form className='mb-5'>
                        <div className='row m-3'>
                            <FormattedMessage id='manage-user.add' />
                        </div>
                        <div className='row'>
                            <div className='form-group col-3'>
                                <label htmlFor='email'>
                                    <FormattedMessage id='manage-user.email' />
                                </label>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    disabled={action === CRUD_ACTION.EDIT ? true : false}
                                    value={user.email}
                                    onChange={(e) => handleOnchangeInput(e, 'email')}
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label htmlFor='password'>
                                    <FormattedMessage id='manage-user.password' />
                                </label>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='password'
                                    disabled={action === CRUD_ACTION.EDIT ? true : false}
                                    value={user.password}
                                    onChange={(e) => handleOnchangeInput(e, 'password')}
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label htmlFor='firstName'>
                                    <FormattedMessage id='manage-user.first-name' />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='firstName'
                                    value={user.firstName}
                                    onChange={(e) => handleOnchangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label htmlFor='lastName'>
                                    <FormattedMessage id='manage-user.last-name' />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='lastName'
                                    value={user.lastName}
                                    onChange={(e) => handleOnchangeInput(e, 'lastName')}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='form-group col-3'>
                                <label htmlFor='phoneNumber'>
                                    <FormattedMessage id='manage-user.phone-number' />
                                </label>
                                <input
                                    type='tel'
                                    className='form-control'
                                    id='phoneNumber'
                                    value={user.phoneNumber}
                                    onChange={(e) => handleOnchangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className='form-group col-9'>
                                <label htmlFor='address'>
                                    <FormattedMessage id='manage-user.address' />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='address'
                                    value={user.address}
                                    onChange={(e) => handleOnchangeInput(e, 'address')}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='form-group col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.gender' />
                                </label>
                                <select
                                    className='form-control'
                                    value={user.gender}
                                    onChange={(e) => handleOnchangeInput(e, 'gender')}
                                >
                                    {genderRedux &&
                                        genderRedux.length > 0 &&
                                        genderRedux.map((g, index) => (
                                            <option key={index} value={g.keyMap}>
                                                {language === LANGUAGES.VI ? g.valueVi : g.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className='form-group col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.position' />
                                </label>
                                <select
                                    className='form-control'
                                    value={user.positionId}
                                    onChange={(e) => handleOnchangeInput(e, 'positionId')}
                                >
                                    {positionRedux &&
                                        positionRedux.length > 0 &&
                                        positionRedux.map((p, index) => (
                                            <option key={index} value={p.keyMap}>
                                                {language === LANGUAGES.VI ? p.valueVi : p.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className='form-group col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.role' />
                                </label>
                                <select
                                    className='form-control'
                                    value={user.roleId}
                                    onChange={(e) => handleOnchangeInput(e, 'roleId')}
                                >
                                    {roleRedux &&
                                        roleRedux.length > 0 &&
                                        roleRedux.map((r, index) => (
                                            <option key={index} value={r.keyMap}>
                                                {language === LANGUAGES.VI ? r.valueVi : r.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className='form-group col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.image' />
                                </label>
                                <div className='image-container'>
                                    <input
                                        type='file'
                                        id='previewImg'
                                        hidden
                                        onChange={(e) => handleOnchangeImage(e)}
                                    />
                                    <label htmlFor='previewImg' className='upload-image'>
                                        <span>Tải ảnh</span> <i className='fas fa-upload'></i>
                                    </label>
                                    <div
                                        className='prev-image'
                                        style={{ backgroundImage: `url(${previewImage})` }}
                                        onClick={() => openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12'>
                            <button
                                className={
                                    action === CRUD_ACTION.EDIT
                                        ? 'btn btn-warning px-2 mt-3'
                                        : 'btn btn-primary px-2 mt-3'
                                }
                                onClick={(e) => handleSaveUser(e)}
                            >
                                {action === CRUD_ACTION.EDIT ? (
                                    <FormattedMessage id='manage-user.edit' />
                                ) : (
                                    <FormattedMessage id='manage-user.save' />
                                )}
                            </button>
                        </div>
                    </form>
                    <div className='col-12 mb-5'>
                        <TableManageUser
                            handleEditUserRedux={handleEditUserRedux}
                            action={action}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders, // admin from adminReducer
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        UserRedux: state.admin.users, // ref => adminReducer.js (admin from rootReducer.js)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (newUserData) => dispatch(actions.createNewUser(newUserData)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUser: (userData) => dispatch(actions.editUser(userData)),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //   dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
