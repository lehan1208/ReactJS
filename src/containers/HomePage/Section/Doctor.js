import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/';

function Doctor(props) {
   
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const { loadTopDoctor, topDoctorsRedux, language } = props;
    const [arrDoctors, setArrDoctors] = useState([]);

    useEffect(() => {
        loadTopDoctor();
    }, []);

    useEffect(() => {
        setArrDoctors(topDoctorsRedux);
    }, [topDoctorsRedux]);

    return (
        <div className='section-share section-doctor'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='section-title'>Bác sĩ nổi bật tuần qua</span>
                    <button className='section-search-btn'>Tìm kiếm</button>
                    <div></div>
                </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        {arrDoctors &&
                            arrDoctors.length > 0 &&
                            arrDoctors.map((item, index) => {
                                // console.log("🚀 ~ file: Doctor.js ~ line 44 ~ arrDoctors.map ~ item", item)
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString(
                                        'binary'
                                    );
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}  `;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName} `;

                                return (
                                    <div className='section-customize' key={index}>
                                        <div className='border-customize'>
                                            <div className='outer-bg'>
                                                <div
                                                    className='bg-image'
                                                    style={{
                                                        backgroundImage: `url(${imageBase64})`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div className='img-des'>
                                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                                </div>
                                                <div>Sức khỏe tâm thần</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
