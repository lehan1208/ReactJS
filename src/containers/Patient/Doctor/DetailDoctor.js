import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { LANGUAGES } from '../../../utils/';
import { getDetailInfoDoctor } from '../../../services/userService';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';

function DetailDoctor({ language }) {
    let { id } = useParams();
    const [detailDoctor, setDetailDoctor] = useState({});

    useEffect(() => {
        async function fetchData() {
            const res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                setDetailDoctor(res.data);
            }
        }
        fetchData();
    }, [id]);

    let nameVi = '',
        nameEn = '';
    if (detailDoctor && detailDoctor.positionData) {
        nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}  `;
        nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName} `;
    }

    return (
        <>
            <HomeHeader isShowBanner={false} />
            <div className='doctor-detail-container'>
                <div className='intro-doctor'>
                    <div className='down '>
                        <div
                            className='left'
                            style={{ backgroundImage: `url(${detailDoctor.image})` }}
                        ></div>
                        <div className='right d-flex flex-column '>
                            <div className='doctor-name '>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='doctor-info'>
                                {detailDoctor &&
                                    detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description && (
                                        <span>{detailDoctor.Markdown.description}</span>
                                    )}
                            </div>
                            <button className=' share-btn btn btn-primary'>Chia sẻ</button>
                        </div>
                    </div>
                </div>
                <div className='schedule-doctor'>
                    <div className='content-left'>
                        <DoctorSchedule idFromParent={id} />
                    </div>
                    <div className='content-right'>
                        <DoctorExtraInfo idFromParent={id} />
                    </div>
                </div>
                <div className='detail-info-doctor'>
                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
                        <div
                            dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}
                        ></div>
                    )}
                </div>
                <div className='comment-doctor'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
