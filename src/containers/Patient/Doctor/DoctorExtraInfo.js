import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils/';

function DoctorExtraInfo({ language }) {
    const { id } = useParams();
    const [isShowPrice, setIsShowPrice] = useState(true);

    useEffect(() => {}, []);

    const togglePrice = () => {
        setIsShowPrice(!isShowPrice);
    };
    return (
        <div className='doctor-extra-info-container'>
            <div className='content-top'>
                <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                <div className='text-clinic'>
                    Phòng khám Bệnh viện Đại học Y Dược 1 20-22 Dương Quang Trung, Phường 12,
                </div>
                <div className='detail-address'>Quận 10, Tp. HCM</div>
            </div>
            <div className='content-bottom'>
                {isShowPrice === false ? (
                    <div>
                        <span className='gia-kham-bottom'>GIÁ KHÁM: </span>
                        250.000đ - 500.000đ
                        <span className='show-price' onClick={togglePrice}>
                            Xem chi tiết
                        </span>
                    </div>
                ) : (
                    <>
                        <h3>GIÁ KHÁM: .</h3>
                        <div className='detail d-flex justify-content-between'>
                            <span>
                                <span className='gia-kham'> Giá khám</span>
                                <br />
                                Giá tư vấn 15 phút: 250.000vnđ
                                <br />
                                Giá tư vấn 30 phút: 500.000vnđ
                            </span>
                            <span> 250.000đ - 500.000đ</span>
                        </div>
                        <div className='payment'>
                            Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ
                        </div>
                        <div className='py-2'>
                            <span className='hide-price ' onClick={togglePrice}>
                                Ẩn bảng giá
                            </span>
                        </div>
                    </>
                )}
            </div>
            <div className='content-bottom'></div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
