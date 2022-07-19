import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import './DoctorExtraInfo.scss';
import { getExtraInfoDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';

function DoctorExtraInfo({ language }) {
    const { id } = useParams();
    const [isShowPrice, setIsShowPrice] = useState(true);
    const [extraInfo, setExtraInfo] = useState({});

    useEffect(() => {
        async function fetchData() {
            const res = await getExtraInfoDoctorById(id);
            if (res && res.errCode === 0) setExtraInfo(res.data);
        }
        fetchData();
    }, [id]);
    console.log('🚀 ~ file: DoctorExtraInfo.js ~ line 15 ~ fetchData ~ data', extraInfo);

    const togglePrice = () => {
        setIsShowPrice(!isShowPrice);
    };
    return (
        <div className='doctor-extra-info-container'>
            <div className='content-top'>
                <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                <div className='text-clinic'>
                    {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                </div>
                <div className='detail-address'>
                    {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                </div>
            </div>
            <div className='content-bottom'>
                {isShowPrice === false ? (
                    <div>
                        <span className='gia-kham-bottom'>GIÁ KHÁM: </span>
                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
                            <NumberFormat
                                value={
                                    extraInfo && extraInfo.priceTypeData.valueVi
                                        ? extraInfo.priceTypeData.valueVi
                                        : ''
                                }
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        )}
                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
                            <NumberFormat
                                value={
                                    extraInfo && extraInfo.priceTypeData.valueEn
                                        ? extraInfo.priceTypeData.valueEn
                                        : ''
                                }
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        )}
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
                            <span>
                                {extraInfo &&
                                    extraInfo.priceTypeData &&
                                    language === LANGUAGES.VI && (
                                        <NumberFormat
                                            value={
                                                extraInfo && extraInfo.priceTypeData.valueVi
                                                    ? extraInfo.priceTypeData.valueVi
                                                    : ''
                                            }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    )}
                                {extraInfo &&
                                    extraInfo.priceTypeData &&
                                    language === LANGUAGES.EN && (
                                        <NumberFormat
                                            value={
                                                extraInfo && extraInfo.priceTypeData.valueEn
                                                    ? extraInfo.priceTypeData.valueEn
                                                    : ''
                                            }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    )}
                            </span>
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
