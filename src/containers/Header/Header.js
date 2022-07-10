import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
// import { changeLanguageApp } from '../../store/actions';

function Header(props) {
  const handleChangeLanguage = (language) => {
    props.changeLanguageAppRedux(language);
  };

  const { processLogout, language } = props;

  return (
    <div className='header-container'>
      {/* thanh navigator */}
      <div className='header-tabs-container'>
        <Navigator menus={adminMenu} />
      </div>

      <div className='language'>
        <span
          className={
            language === LANGUAGES.VI ? 'language-vi active' : 'language-vi '
          }
          onClick={() => handleChangeLanguage(LANGUAGES.VI)}
        >
          VN
        </span>
        <span
          className={
            language === LANGUAGES.EN ? 'language-en active' : 'language-en '
          }
          onClick={() => handleChangeLanguage(LANGUAGES.EN)}
        >
          EN
        </span>
        <div className='btn btn-logout' onClick={processLogout} title='Log out'>
          <i className='fas fa-sign-out-alt'></i>
        </div>
      </div>

      {/* nút logout */}
    </div>
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
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
