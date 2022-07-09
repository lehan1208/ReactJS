import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpg';

function Specialty(props) {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className='section-specialty'>
      <div className='specialty-container'>
        <div className='specialty-header'>
          <span className='specialty-title'>Chuyên khoa phổ biến</span>
          <button className='specialty-search-btn'>Xem thêm</button>
          <div></div>
        </div>
        <div className='specialty-body'>
          <Slider {...settings}>
            <div className='specialty-customize'>
              <div className='bg-image' src={specialtyImg}></div>
              <div className='img-des'>Cơ xương khớp 1</div>
            </div>
            <div className='specialty-customize'>
              <div className='bg-image' src={specialtyImg}></div>

              <div className='img-des'>Cơ xương khớp 2</div>
            </div>
            <div className='specialty-customize'>
              <div className='bg-image' src={specialtyImg}></div>

              <div className='img-des'>Cơ xương khớp 3</div>
            </div>
            <div className='specialty-customize'>
              <div className='bg-image' src={specialtyImg}></div>
              <div className='img-des'>Cơ xương khớp 4</div>
            </div>
            <div className='specialty-customize'>
              <div className='bg-image' src={specialtyImg}></div>
              <div className='img-des'>Cơ xương khớp 5</div>
            </div>
            <div className='specialty-customize'>
              <div className='bg-image' src={specialtyImg}></div>
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
