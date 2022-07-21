import React from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
// import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

function BookingModal({ language, isShowBookingModal, closeBookingModal, dataTime }) {
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

    return (
        <div>
            <Modal
                isOpen={isShowBookingModal}
                size='lg'
                centered
                className='booking-modal-container'
                backdrop={true}
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span>Đặt lịch khám bệnh</span>
                        <i className='close-modal fas fa-times' onClick={closeBookingModal}></i>
                    </div>
                    <div className='booking-modal-body container'>
                        {/* JSON.stringify => convert object => string */}
                        {/* {JSON.stringify(dataScheduleTimeModal)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor doctorId={doctorId} />
                        </div>
                        <div className='row form-group body-input'>
                            <div className='col-12'>
                                <label htmlFor='name'>Họ tên</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='name'
                                    placeholder='Nhập họ tên'
                                />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='gender'>Giới tính</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='gender'
                                    placeholder='Giới tính'
                                />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='for'>Đặt cho ai</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='for'
                                    placeholder='Đặt cho ai'
                                />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='phoneNumber'>Số điện thoại</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='phoneNumber'
                                    placeholder='Số điện thoại liên hệ (bắt buộc)'
                                />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='location'>Địa chỉ</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='location'
                                    placeholder='Địa chỉ'
                                />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='issue'>Lý do khám</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='issue'
                                    placeholder='Nhập lý do'
                                />
                            </div>
                        </div>
                    </div>
                    <button className='btn-booking-confirm'>Xác nhận đặt hẹn</button>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
