import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl';

function MedicalFacility(props) {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
                        <div className='section-customize'>
                            <div className='bg-image'></div>
                            <div className='img-des'>Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image'></div>
                            <div className='img-des'>Bệnh viện Chợ Rẫy</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image'></div>
                            <div className='img-des'>Bệnh viện An Việt</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image'></div>
                            <div className='img-des'>Bệnh viện Thu Cúc</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image'></div>
                            <div className='img-des'>Bệnh viện Vietlife</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image'></div>
                            <div className='img-des'>Bệnh viện Vinmec</div>
                        </div>
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
