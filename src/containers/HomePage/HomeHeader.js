import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';

const arrInfos = [
  { key: '/specialty', icon: 'fas fa-hospital-alt', title: 'Khám chuyên khoa' },
  { key: '2', icon: 'fas fa-mobile-alt', title: 'Khám từ xa' },
  { key: '3', icon: 'fas fa-procedures', title: 'Khám tổng quát' },
  { key: '4', icon: 'fas fa-vials', title: 'Xét nghiệm y học' },
  { key: '5', icon: 'fas fa-heart', title: 'Sức khỏe tinh thần' },
  { key: '6', icon: 'fas fa-briefcase-medical', title: 'Khám nha khoa' },
  { key: '7', icon: 'fas fa-syringe', title: 'Gói phẫu thuật' },
  { key: '8', icon: 'fas fa-ambulance', title: 'Sản phẩm y tế' },
];

function HomeHeader(props) {
  const changeLanguage = (language) => {
    props.changeLanguageAppRedux(language);
  };

  let language = props.language;

  const handleClick = (key) => {
    // Handle follow key
  };

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
            {arrInfos.map((m, index) => (
              <div
                key={index}
                className='option-child'
                onClick={() => handleClick(m.key)}
              >
                <div className='icon-child'>
                  <i className={m.icon}></i>
                </div>
                <div className='text-child'>{m.title}</div>
              </div>
            ))}
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
