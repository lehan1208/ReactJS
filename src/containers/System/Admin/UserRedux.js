import React, { useEffect, useState } from 'react';
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';

function UserRedux(props) {
  const {
    getGenderStart,
    genderRedux,
    getPositionStart,
    getRoleStart,
    roleRedux,
    positionRedux,
  } = props;

  const [previewImage, setPreviewImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      getGenderStart();
      getPositionStart();
      getRoleStart();
    }
    fetchData();
  }, []);

  const language = props.language;
  const handleOnchangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const openPreviewImage = () => {
    if (!previewImage) {
      return;
    } else {
      setIsOpen(true);
    }
  };

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
          <form>
            <div className='row m-3'>
              <FormattedMessage id='manage-user.add' />
            </div>
            <div className='row'>
              <div className='form-group col-3'>
                <label htmlFor='email'>
                  <FormattedMessage id='manage-user.email' />
                </label>
                <input type='email' className='form-control' id='email' />
              </div>
              <div className='form-group col-3'>
                <label htmlFor='password'>
                  <FormattedMessage id='manage-user.password' />
                </label>
                <input type='password' className='form-control' id='password' />
              </div>
              <div className='form-group col-3'>
                <label htmlFor='firstName'>
                  <FormattedMessage id='manage-user.first-name' />
                </label>
                <input type='text' className='form-control' id='firstName' />
              </div>
              <div className='form-group col-3'>
                <label htmlFor='lastName'>
                  <FormattedMessage id='manage-user.last-name' />
                </label>
                <input type='text' className='form-control' id='lastName' />
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-2'>
                <label htmlFor='phoneNumber'>
                  <FormattedMessage id='manage-user.phone-number' />
                </label>
                <input type='tel' className='form-control' id='phoneNumber' />
              </div>
              <div className='form-group col-6'>
                <label htmlFor='address'>
                  <FormattedMessage id='manage-user.address' />
                </label>
                <input type='text' className='form-control' id='address' />
              </div>
              <div className='form-group col-2'>
                <label>
                  <FormattedMessage id='manage-user.gender' />
                </label>
                <select className='form-control'>
                  {genderRedux &&
                    genderRedux.length > 0 &&
                    genderRedux.map((g, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI ? g.valueVi : g.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className='form-group col-2'>
                <label>
                  <FormattedMessage id='manage-user.position' />
                </label>
                <select className='form-control'>
                  {positionRedux &&
                    positionRedux.length > 0 &&
                    positionRedux.map((p, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI ? p.valueVi : p.valueEn}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-3'>
                <label>
                  <FormattedMessage id='manage-user.role' />
                </label>
                <select className='form-control'>
                  {roleRedux &&
                    roleRedux.length > 0 &&
                    roleRedux.map((r, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI ? r.valueVi : r.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className='form-group col-6'>
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
              <button className='btn btn-primary px-2 mt-3'>
                <FormattedMessage id='manage-user.save' />
              </button>
            </div>
          </form>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
