import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { LANGUAGES } from '../../../utils/';
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
    fetchUserRedux,
    UserRedux,
  } = props;

  const [previewImage, setPreviewImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState('');

  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    gender: '',
    position: '',
    role: '',
    image: '',
  });

  const handleOnchangeInput = (e, key) => {
    const newUser = { ...user };
    newUser[key] = e.target.value;
    setUser({ ...newUser });
  };

  useEffect(() => {
    async function fetchData() {
      getGenderStart();
      getPositionStart();
      getRoleStart();
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnchangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setAvatar(file);
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
    let arrCheck = [
      'email',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'address',
    ];
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

  const handleSaveUser = (e) => {
    e.preventDefault();
    let isValid = checkValidateInput();
    if (isValid === false) return;
    // Fire redux
    createNewUser(user);
    console.log(
      '🚀 ~ file: UserRedux.js ~ line 103 ~ handleSaveUser ~ user',
      user
    );

    fetchUserRedux();
    if (UserRedux !== user) {
      setUser({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: genderRedux[0].key,
        position: positionRedux[0].key,
        role: roleRedux[0].key,
        image: '',
      });
      console.log(user);
    }
  };

  const handleEditUserRedux = (item) => {
    alert('Edit user redux');
    console.log('Edit user redux', item);
  };

  const language = props.language;

  return (
    <div className='user-redux-container'>
      <div className='title'>Quản lý người dùng hệ thống</div>
      <div className='user-redux-body'>
        {isOpen && (
          <Lightbox
            mainSrc={previewImage}
            onCloseRequest={() => setIsOpen(false)}
          />
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
                  defaultValue={user.gender}
                  onChange={(e) => handleOnchangeInput(e, 'gender')}
                >
                  {genderRedux &&
                    genderRedux.length > 0 &&
                    genderRedux.map((g, index) => (
                      <option key={index} value={g.key}>
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
                  defaultValue={user.position}
                  onChange={(e) => handleOnchangeInput(e, 'position')}
                >
                  {positionRedux &&
                    positionRedux.length > 0 &&
                    positionRedux.map((p, index) => (
                      <option key={index} value={p.key}>
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
                  defaultValue={user.role}
                  onChange={(e) => handleOnchangeInput(e, 'role')}
                >
                  {roleRedux &&
                    roleRedux.length > 0 &&
                    roleRedux.map((r, index) => (
                      <option key={index} value={r.key}>
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
                className='btn btn-primary px-2 mt-3'
                onClick={(e) => handleSaveUser(e)}
              >
                <FormattedMessage id='manage-user.save' />
              </button>
            </div>
          </form>
          <div className='col-12 mb-5'>
            <TableManageUser handleEditUserRedux={handleEditUserRedux} />
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
    createNewUser: (newUserData) =>
      dispatch(actions.createNewUser(newUserData)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
