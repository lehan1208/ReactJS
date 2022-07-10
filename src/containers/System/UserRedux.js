import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

function UserRedux(props) {
  return (
    <div className='user-redux-container'>
      <div className='title'>User Redux</div>
      <div className='user-redux-body'>
        <div>Thêm mới người dùng</div>
      </div>
    </div>
  );
}

const state = {};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
