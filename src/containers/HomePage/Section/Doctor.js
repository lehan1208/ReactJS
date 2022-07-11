import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Doctor(props) {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

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
            <div className='section-customize'>
              <div className='border-customize'>
                <div className='outter-bg'>
                  <div className='bg-image'></div>
                </div>
                <div className='position text-center'>
                  <div className='img-des'>
                    Bác sĩ chuyên khoa II Trần Minh Khuyên
                  </div>
                  <div>Sức khỏe tâm thần</div>
                </div>
              </div>
            </div>
            <div className='section-customize'>
              <div className='border-customize'>
                <div className='outter-bg'>
                  <div className='bg-image'></div>
                </div>
                <div className='position text-center'>
                  <div className='img-des'>
                    Bác sĩ chuyên khoa II Trần Minh Khuyên
                  </div>
                  <div>Sức khỏe tâm thần</div>
                </div>
              </div>
            </div>
            <div className='section-customize'>
              <div className='border-customize'>
                <div className='outter-bg'>
                  <div className='bg-image'></div>
                </div>
                <div className='position text-center'>
                  <div className='img-des'>
                    Bác sĩ chuyên khoa II Trần Minh Khuyên
                  </div>
                  <div>Sức khỏe tâm thần</div>
                </div>
              </div>
            </div>
            <div className='section-customize'>
              <div className='border-customize'>
                <div className='outter-bg'>
                  <div className='bg-image'></div>
                </div>
                <div className='position text-center'>
                  <div className='img-des'>
                    Bác sĩ chuyên khoa II Trần Minh Khuyên
                  </div>
                  <div>Sức khỏe tâm thần</div>
                </div>
              </div>
            </div>
            <div className='section-customize'>
              <div className='border-customize'>
                <div className='outter-bg'>
                  <div className='bg-image'></div>
                </div>
                <div className='position text-center'>
                  <div className='img-des'>
                    Bác sĩ chuyên khoa II Trần Minh Khuyên
                  </div>
                  <div>Sức khỏe tâm thần</div>
                </div>
              </div>
            </div>
            <div className='section-customize'>
              <div className='border-customize'>
                <div className='outter-bg'>
                  <div className='bg-image'></div>
                </div>
                <div className='position text-center'>
                  <div className='img-des'>
                    Bác sĩ chuyên khoa II Trần Minh Khuyên
                  </div>
                  <div>Sức khỏe tâm thần</div>
                </div>
              </div>
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

export default connect(mapStateToProps)(Doctor);
