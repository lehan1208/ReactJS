import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllSpecialty } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

function Specialty(props) {
    const history = useHistory(); // useNavigate instead of useHistory in V6

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const [dataSpecialty, setDataSpecialty] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getAllSpecialty();
            if (res && res.errCode === 0) {
                setDataSpecialty(res.data ? res.data : []);
            }
        }
        fetchData();
    }, []);

    const handleViewDetailDoctor = (item) => {
        history.push(`/detail-specialty/${item.id}`);
    };

    return (
        <div className='section-share section-specialty'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='section-title'>
                        <FormattedMessage id='homepage.specialty' />
                    </span>
                    <button className='section-search-btn'>
                        <FormattedMessage id='homepage.more-info' />
                    </button>
                    <div></div>
                </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        {dataSpecialty &&
                            dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => (
                                <div
                                    className='section-customize'
                                    key={index}
                                    onClick={() => handleViewDetailDoctor(item)}
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

export default connect(mapStateToProps)(Specialty);
