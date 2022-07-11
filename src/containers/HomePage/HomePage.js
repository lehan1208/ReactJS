import React from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty.js';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss';
import Doctor from './Section/Doctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';

function HomePage() {
  return (
    <div>
      <HomeHeader />
      <Specialty />
      <MedicalFacility />
      <Doctor />
      <HandBook />
      <About />
      <HomeFooter />
      {/* <div style={{ height: '300px' }}></div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
