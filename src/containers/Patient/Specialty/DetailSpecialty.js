import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
// import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

function DetailSpecialty({ language }) {
    const { id } = useParams();
    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailSpecialty, setDataDetailSpecialty] = useState({});
    const [listProvince, setListProvince] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL',
            });
            let resProvince = await getAllCodeService('PROVINCE');

            // console.log('🚀 ~ file: DetailSpecialty.js ~ line 22 ~ fetchData ~ res', res);

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let arr = res.doctorSpecialty;
                let arrDoctorId = [];
                if (arr && arr.length > 0) {
                    arr.map((item) => arrDoctorId.push(item.doctorId));
                }
                setDataDetailSpecialty(res);
                setArrDoctorId(arrDoctorId);
                setListProvince(resProvince.data);
            }
        }
        fetchData();
    }, [id]);

    const handleOnchangeSelect = (event) => {
        console.log(
            '🚀 ~ file: DetailSpecialty.js ~ line 48 ~ handleOnchangeSelect ~ event',
            event.target.value,
        );
    };

    return (
        <div className='detail-specialty-container'>
            <HomeHeader />
            <div className='description-specialty-container'>
                <div className='description-specialty'>
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: dataDetailSpecialty.data?.descriptionHTML,
                            }}
                        ></div>
                    )}
                </div>
            </div>
            <div className='search-sp-doctor'>
                <select onChange={(event) => handleOnchangeSelect(event)}>
                    {listProvince &&
                        listProvince.length > 0 &&
                        listProvince.map((item, index) => (
                            <option key={index} value={item.keyMap}>
                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                            </option>
                        ))}
                </select>
            </div>
            <div className='detail-specialty-body'>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
