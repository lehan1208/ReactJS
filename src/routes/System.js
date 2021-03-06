import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';

function System(props) {
    const { systemMenuPath, isLoggedIn } = props;

    return (
        <>
            {isLoggedIn && <Header />}
            <div className='system-container'>
                <div className='system-list'>
                    <Switch>
                        <Route path='/system/user-manage' component={UserManage} />
                        <Route path='/system/user-redux' component={UserRedux} />
                        <Route path='/system/manage-doctor' component={ManageDoctor} />
                        <Route path='/system/manage-specialty' component={ManageSpecialty} />
                        /system/manage-specialty
                        <Route
                            component={() => {
                                return <Redirect to={systemMenuPath} />;
                            }}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
