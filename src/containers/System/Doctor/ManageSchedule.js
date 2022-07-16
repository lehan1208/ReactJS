import React from 'react';
import { connect } from 'react-redux';

function ManageSchedule(props) {
    const { isLoggedIn } = props;

    return <div>ManageSchedule</div>;
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
