import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService';

function MedicalFacility(props) {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const history = useHistory();
    const [dataClinic, setDataClinic] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                setDataClinic(res.data ? res.data : []);
            }
        }
        fetchData();
    }, []);

    const handleViewDetailClinic = (item) => {
        history.push(`/detail-clinic/${item.id}`);
    };

    return (
        <div className='section-share section-facility'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='section-title'>
                        <FormattedMessage id='homepage.facility' />
                    </span>
                    <button className='section-search-btn'>
                        <FormattedMessage id='homepage.search' />
                    </button>
                    <div></div>
                </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        {dataClinic &&
                            dataClinic.length > 0 &&
                            dataClinic.map((item, index) => (
                                <div
                                    className='section-customize'
                                    key={index}
                                    onClick={() => handleViewDetailClinic(item)}
                                >
                                    <div
                                        className='bg-image'
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className='img-des'>{item.name}</div>
                                </div>
                            ))}
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
    };
};

export default connect(mapStateToProps)(MedicalFacility);
