import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Doctor from './../../HomePage/Section/Doctor';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/';

function UserRedux(props) {
  const [genderArr, setGenderArr] = useState([]);
  const [positionArr, setPositionArr] = useState([]);
  const [roleArr, setRoleArr] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await getAllCodeService('gender');
        if (res && res.errCode === 0) {
          setGenderArr(res.data);
        }
      } catch (e) {}
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await getAllCodeService('role');
        if (res && res.errCode === 0) {
          setRoleArr(res.data);
        }
      } catch (e) {}
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await getAllCodeService('position');
        if (res && res.errCode === 0) {
          setPositionArr(res.data);
        }
      } catch (e) {}
    }
    fetchData();
  }, []);

  const language = props.language;

  console.log('check state position: ', positionArr);

  return (
    <div className='user-redux-container'>
      <div className='title'>Quản lý người dùng hệ thống</div>
      <div className='user-redux-body'>
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
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((g, index) => (
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
                  {positionArr &&
                    positionArr.length > 0 &&
                    positionArr.map((p, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI ? p.valueVi : p.valueEn}
                      </option>
                    ))}
                  {/* <option defaultValue value=''>
                    --- Choose ---
                  </option>
                  <option value='0'>Doctor</option>
                  <option value='1'>Master</option>
                  <option value='2'>User</option> */}
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-3'>
                <label>
                  <FormattedMessage id='manage-user.role' />
                </label>
                <select className='form-control'>
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((r, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI ? r.valueVi : r.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className='form-group col-3'>
                <label>
                  {' '}
                  <FormattedMessage id='manage-user.image' />
                </label>
                <input type='text' className='form-control' />
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

const state = {};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
