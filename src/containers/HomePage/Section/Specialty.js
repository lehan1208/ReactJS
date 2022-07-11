import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Specialty(props) {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className='section-share section-specialty'>
      <div className='section-container'>
        <div className='section-header'>
          <span className='section-title'>Chuyên khoa phổ biến</span>
          <button className='section-search-btn'>Xem thêm</button>
          <div></div>
        </div>
        <div className='section-body'>
          <Slider {...settings}>
            <div className='section-customize'>
              <div className='bg-image'></div>
              <div className='img-des'>Cơ xương khớp 1</div>
            </div>
            <div className='section-customize'>
              <div className='bg-image'></div>

              <div className='img-des'>Cơ xương khớp 2</div>
            </div>
            <div className='section-customize'>
              <div className='bg-image'></div>

              <div className='img-des'>Cơ xương khớp 3</div>
            </div>
            <div className='section-customize'>
              <div className='bg-image'></div>
              <div className='img-des'>Cơ xương khớp 4</div>
            </div>
            <div className='section-customize'>
              <div className='bg-image'></div>
              <div className='img-des'>Cơ xương khớp 5</div>
            </div>
            <div className='section-customize'>
              <div className='bg-image'></div>
              <div className='img-des'>Cơ xương khớp 6</div>
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

export default connect(mapStateToProps)(Specialty);