import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './DefaultSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';

function DefaultSpecialty({ language }) {
    useEffect(() => {}, []);

    return (
        <>
            <HomeHeader />
            <div>
                <h2> Hello world</h2>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSpecialty);
