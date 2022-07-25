import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById } from '../../../services/userService';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter';

function DetailClinic({ language }) {
    const { id } = useParams();
    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailClinic, setDataDetailClinic] = useState({});

    useEffect(() => {
        async function fetchData() {
            const res = await getDetailClinicById({ id: id });
            if (res && res.errCode === 0) {
                let arr = res.doctorClinic;
                let arrDoctorId = [];
                if (arr && arr.length > 0) {
                    arr.map((item) => arrDoctorId.push(item.doctorId));
                }

                setDataDetailClinic(res);
                setArrDoctorId(arrDoctorId);
            }
        }
        fetchData();
    }, [id]);

    return (
        <>
            <div className='detail-clinic-container'>
                <HomeHeader />
                <div className='description-clinic-container'>
                    <div className='description-clinic'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                            <>
                                <div className='clinic-name my-3'>
                                    <i className='fas fa-map-marker-alt mr-2'></i>
                                    <span>{dataDetailClinic.data?.name}</span>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: dataDetailClinic.data?.descriptionHTML,
                                    }}
                                ></div>
                            </>
                        )}
                    </div>
                </div>

                <div className='detail-clinic-body'>
                    {arrDoctorId &&
                        arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => (
                            <div className='each-doctor' key={index}>
                                <div className='content-left'>
                                    <div className='profile-doctor'>
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescription={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
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
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
