import React from 'react';
import { connect } from 'react-redux';

function About(props) {
  return (
    <div className='section-share section-about'>
      <div className='section-about-container'>
        <div className='section-about-header py-3 px-2'>
          Truyền thông nói về BookingCare
        </div>

        <div className='section-about-content '>
          <div className='content-left '>
            <iframe
              className='iframe'
              width='50%'
              height='480'
              src='https://www.youtube.com/embed/FyDQljKtWnI'
              title='CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
          <div className='content-right '>
            <a href='ds#'>
              <img
                src='https://bookingcare.vn/assets/truyenthong/suckhoedoisong.png'
                alt=''
              />
            </a>
            <a href='ds#'>
              <img
                src='https://bookingcare.vn/assets/truyenthong/vtv1.png'
                alt=''
              />
            </a>
            <a href='ds#'>
              <img
                src='https://bookingcare.vn/assets/truyenthong/ictnews.png'
                alt=''
              />
            </a>

            <a href='ds#'>
              <img
                src='https://bookingcare.vn/assets/truyenthong/vnexpress.png'
                alt=''
              />
            </a>
            <a href='ds#'>
              <img
                src='https://bookingcare.vn/assets/truyenthong/cuc-cong-nghe-thong-tin-bo-y-te-2.png'
                alt=''
              />
            </a>
          </div>
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

export default connect(mapStateToProps)(About);
