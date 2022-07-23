import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import './DefaultClass.scss';
import { FormattedMessage } from 'react-intl';

function DefaultClass({ language }) {
    useEffect(() => {}, []);

    return <div>Hello From DetailClass</div>;
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
