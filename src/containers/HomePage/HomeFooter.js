import React from 'react';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const arrPolicy = [
  { title: 'Liên hệ hợp tác', href: '#' },
  { title: 'Câu hỏi thường gặp', href: '#' },
  { title: 'Điều khoản sử dụng', href: '#' },
  { title: 'Chính sách Bảo mật', href: '#' },
  { title: 'Quy trình hỗ trợ giải quyết khiếu nại', href: '#' },
  { title: 'Quy chế hoạt động', href: '#' },
];

const arrLocation = [
  {
    label: 'Trụ sở tại Hà Nội',
    value: '28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội',
  },
  {
    label: 'Văn phòng tại TP Hồ Chí Minh',
    value: '6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1',
  },
  { label: 'Hỗ trợ khách hàng', value: 'support@bookingcare.vn (7h30 - 18h)' },
];

function HomeFooter(props) {
  return (
    <div className='footer'>
      <div className='footer-container'>
        <div className='flex row footer-info'>
          <div className='col-6 info'>
            <div className='footer-logo-container'></div>
            <div className='fw-bold fs-5'>
              Công ty Cổ phần Công nghệ BookingCare
            </div>
            <div className='gap-2 d-flex align-items-center'>
              <i className='fas fa-map-marker-alt my-2'></i>
              28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
            </div>
            <div className='gap-2 d-flex align-items-center'>
              <i className='fas fa-check '></i>
              <span>
                ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
              </span>
            </div>
            <div className='mt-2'>
              <a href='sds#'>
                <img
                  src='https://bookingcare.vn/assets/icon/bo-cong-thuong.svg'
                  alt='bo-cong-thuong'
                />
              </a>
            </div>
          </div>
          <div className='col-3 policy'>
            {arrPolicy.map((m, index) => (
              <a
                href={m.href}
                className='d-block my-2 text-decoration-none'
                key={index}
              >
                {m.title}
              </a>
            ))}
          </div>
          <div className='col-3 location d-flex flex-column justify-content-between'>
            {arrLocation.map((m, index) => (
              <div key={index}>
                <span className='d-block fw-bold '>{m.label}</span>
                <span>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='row footer-app'>
          <div className='mt-2'>
            <i className='fas fa-mobile-alt'></i>
            <span className='footer-title'>
              Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
            </span>
            <span className='download-app'>
              <a href='sds#'>Android</a> - <a href='sds#'> iPhone/iPad</a> -
              <a href='sds#'> Khác</a>
            </span>
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

export default connect(mapStateToProps)(HomeFooter);
