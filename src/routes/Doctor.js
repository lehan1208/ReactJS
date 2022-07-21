import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';

function Doctor(props) {
    const { isLoggedIn } = props;

    return (
        <>
            {isLoggedIn && <Header />}
            <div className='system-container'>
                <div className='system-list'>
                    <Switch>
                        <Route path='/doctor/manage-schedule' component={ManageSchedule} />
                    </Switch>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        // BIến check người dùng đã đăng nhập hay chưa
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
