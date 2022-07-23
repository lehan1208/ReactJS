import React, { useEffect, useState, useParams } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
// import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';

function DefaultSpecialty({ language }) {
    const [arrDoctorId, setArrDoctorId] = useState([268, 269, 270]);

    return (
        <div className='detail-specialty-container'>
            <HomeHeader />
            <div className='detail-specialty-body'>
                <div className='description-specialty'></div>
                {arrDoctorId &&
                    arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => (
                        <div className='each-doctor' key={index}>
                            <div className='content-left'>
                                <div className='profile-doctor'>
                                    <ProfileDoctor
                                        doctorId={item}
                                        isShowDescription={true}
                                        //  dataTime={dataTime}
                                    />
                                </div>
                            </div>
                            <div className='content-right'>
                                <div className='doctor-schedule'>
                                    <DoctorSchedule idFromParent={item} />
                                </div>
                                <div className='doctor-extra-info'>
                                    <DoctorExtraInfo idFromParent={item} />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
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
