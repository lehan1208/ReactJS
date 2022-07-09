import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';

function HomeHeader(props) {
  const changeLanguage = (language) => {
    props.changeLanguageAppRedux(language);
  };

  let language = props.language;

  return (
    <>
      <div className='home-header-container'>
        <div className='home-header-content'>
          <div className='left-content'>
            <i className='fas fa-bars'></i>
            <div className='header-logo'></div>
          </div>
          <div className='center-content'>
            <div className='child-content'>
              <div>
                <b>
                  <FormattedMessage id='home-header.specialty' />
                </b>
              </div>
              <div className='sub-title'>
                <FormattedMessage id='home-header.search-doctor' />
              </div>
            </div>
            <div className='child-content'>
              <div>
                <b>
                  <FormattedMessage id='home-header.clinics' />
                </b>
              </div>
              <div className='sub-title'>
                <FormattedMessage id='home-header.select-clinic' />
              </div>
            </div>
            <div className='child-content'>
              <div>
                <b>
                  <FormattedMessage id='home-header.doctor' />
                </b>
              </div>
              <div className='sub-title'>
                <FormattedMessage id='home-header.select-doctor' />
              </div>
            </div>
            <div className='child-content'>
              <div>
                <b>
                  <FormattedMessage id='home-header.health-package' />
                </b>
              </div>
              <div className='sub-title'>
                <FormattedMessage id='home-header.health-check' />
              </div>
            </div>
          </div>
          <div className='right-content'>
            <div className='support'>
              <i className='fas fa-question-circle'></i>
              <span>Hỗ trợ</span>
            </div>
            <div
              className={
                language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'
              }
            >
              <span onClick={() => changeLanguage(LANGUAGES.VI)}>VN</span>
            </div>
            <div
              className={
                language === LANGUAGES.EN ? 'language-en active' : 'language-en'
              }
            >
              <span onClick={() => changeLanguage(LANGUAGES.EN)}>EN</span>
            </div>
          </div>
        </div>
      </div>
      <div className='home-header-banner'>
        <div className='banner-up'>
          <div className='title1'>NỀN TẢNG Y TẾ</div>
          <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
          <div className='search'>
            <i className='fas fa-search'></i>
            <input type='text' placeholder='Tìm phòng khám' />
          </div>
        </div>

        <div className='banner-down'>
          <div className='option'>
            <div className='option-child'>
              <div className='icon-child'>
                <i className='fas fa-hospital-alt'></i>
              </div>
              <div className='text-child'>Khám chuyên khoa</div>
            </div>
            <div className='option-child'>
              <div className='icon-child'>
                <i className='fas fa-mobile-alt'></i>
              </div>
              <div className='text-child'>Khám từ xa</div>
            </div>
            <div className='option-child'>
              <div className='icon-child'>
                <i className='fas fa-procedures'></i>
              </div>
              <div className='text-child'>Khám tổng quát</div>
            </div>
            <div className='option-child'>
              <div className='icon-child'>
                <i className='fas fa-vials'></i>
              </div>
              <div className='text-child'>Xét nghiệm y học</div>
            </div>
            <div className='option-child'>
              <div className='icon-child'>
                <i className='fas fa-heart'></i>
              </div>
              <div className='text-child'>Sức khỏe tinh thần</div>
            </div>
            <div className='option-child'>
              <div className='icon-child'>
                <i className='fas fa-briefcase-medical'></i>
              </div>
              <div className='text-child'>Khám nha khoa</div>
            </div>
            <div className='option-child'>
              <div className='icon-child'>
                <i className='fas fa-syringe'></i>
              </div>
              <div className='text-child'>Gói phẫu thuật</div>
            </div>
            <div className='option-child'>
              <div className='icon-child'>
                <i className='fas fa-ambulance'></i>
              </div>
              <div className='text-child'>Sản phẩm y tế</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
