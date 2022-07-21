import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/';

function ProfileDoctor({ language, doctorId }) {
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
    console.log('🚀 ~ file: ProfileDoctor.js ~ line 10 ~ ProfileDoctor ~ dataProfile', dataProfile);

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
                            {dataProfile &&
                                dataProfile.Markdown &&
                                dataProfile.Markdown.description && (
                                    <span>{dataProfile.Markdown.description}</span>
                                )}
                        </div>
                        <div className='price'>
                            Giá khám:&nbsp;
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
