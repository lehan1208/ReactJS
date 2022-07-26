import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl';

const arrInfos = [
    {
        image: 'https://cdn.bookingcare.vn/fr/w300/2022/07/24/134149-xet-nghiem-mo-mau-o-dau-tphcm.jpg',
        title: 'Review 6 địa chỉ xét nghiệm mỡ máu tại TP.HCM và chi phí xét nghiệm',
    },
    {
        image: 'https://cdn.bookingcare.vn/fr/w300/2022/07/22/102103-gia-xet-nghiem-tuyen-giap-bao-nhieu.jpg',
        title: 'Giá xét nghiệm tuyến giáp bao nhiêu? Bảng giá một số địa chỉ',
    },
    {
        image: 'https://cdn.bookingcare.vn/fr/w300/2022/07/22/143306-xet-nghiem-mau-tong-quat-bao-nhieu-tien.jpg',
        title: 'Giá xét nghiệm máu bao nhiêu? Bảng giá tại địa chỉ xét nghiệm uy tín TPHCM',
    },
    {
        image: 'https://cdn.bookingcare.vn/fr/w300/2022/07/15/170529-anh-bia-xn-vgb.jpg',
        title: '7 địa chỉ xét nghiệm Viêm gan B uy tín ở TP.HCM',
    },
];

function HandBook(props) {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <div className='section-share section-handbook'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='section-title'>
                        <FormattedMessage id='homepage.handbook' />
                    </span>
                    <button className='section-search-btn'>
                        <FormattedMessage id='homepage.all-post' />
                    </button>
                    <div></div>
                </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        {arrInfos.map((h, index) => (
                            <div className='section-customize d-flex' key={index}>
                                <div
                                    className='bg-image'
                                    style={{ backgroundImage: `url(${h.image})` }}
                                ></div>
                                <div className='img-des handbook ml-3'>{h.title}</div>
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

export default connect(mapStateToProps)(HandBook);
