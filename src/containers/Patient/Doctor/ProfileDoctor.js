import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/';
import _ from 'lodash';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import localization from 'moment/locale/vi';

function ProfileDoctor({ language, doctorId, isShowDescription, dataTime }) {
    const [dataProfile, setDataProfile] = useState({});

    useEffect(() => {
        let id = doctorId;
        async function fetchData() {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                setDataProfile(res.data);
            }
        }
        fetchData();
    }, [doctorId]);

    let nameVi = '',
        nameEn = '';
    if (dataProfile && dataProfile.positionData) {
        nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}  `;
        nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName} `;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const renderTimeBooking = (dataTime) => {
        let date =
            language === LANGUAGES.VI
                ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment
                      .unix(+dataTime.date / 1000)
                      .locale('en')
                      .format('ddd - MM/DD/YYYY');
        let timeType =
            language === LANGUAGES.VI
                ? dataTime.timeTypeData.valueVi
                : dataTime.timeTypeData.valueEn;
        if (dataTime && !_.isEmpty(dataTime)) {
            return (
                <>
                    <div>
                        {timeType} - {capitalizeFirstLetter(date)}
                    </div>
                    <div>
                        <FormattedMessage id='patient.booking-modal.free-booking' />
                    </div>
                </>
            );
        }
        return <></>;
    };

    return (
        <div className='profile-doctor-container'>
            <div className='intro-doctor'>
                <div className='down '>
                    <div
                        className='left'
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image ? dataProfile.image : ''
                            })`,
                        }}
                    ></div>
                    <div className='right d-flex flex-column '>
                        <div className='doctor-name '>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='doctor-info'>
                            {isShowDescription === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>{dataProfile.Markdown.description}</span>
                                        )}
                                </>
                            ) : (
                                renderTimeBooking(dataTime)
                            )}
                        </div>
                        <div className='price'>
                            <FormattedMessage id='patient.booking-modal.price' />

                            {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI ? (
                                <NumberFormat
                                    value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                            ) : (
                                ''
                            )}
                            {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN ? (
                                <NumberFormat
                                    value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
