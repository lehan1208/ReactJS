import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';

function BookingModal({
    language,
    isShowBookingModal,
    closeBookingModal,
    dataTime,
    genders,
    fetchGender,
}) {
    const [patientInfo, setPatientInfo] = useState({
        fullName: '',
        email: '',
        selectedGender: '',
        birthday: '',
        phoneNumber: '',
        address: '',
        reason: '',
        doctorId: '',
        genders: '',
        timeType: '',
    });

    useEffect(() => {
        fetchGender();
    }, [fetchGender]);

    const handleOnchangeInput = (e, key) => {
        let info = { ...patientInfo };
        info[key] = e.target.value;
        setPatientInfo({ ...info });
    };

    const handleOnchangeDatePicker = (date) => {
        setPatientInfo({ ...patientInfo, birthday: date[0] });
    };

    const buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
                return result;
            });
        }
        return result;
    };

    useEffect(() => {
        setPatientInfo({ ...patientInfo, genders: buildDataGender(genders) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genders, language]);

    const handleChangeSelect = (selectedOption) => {
        setPatientInfo({ ...patientInfo, selectedGender: selectedOption });
    };

    useEffect(() => {
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        setPatientInfo({ ...patientInfo, doctorId: doctorId, timeType: dataTime.timeType });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataTime]);

    const handleConfirmBooking = async () => {
        // setPatientInfo({
        //     fullName: '',
        //     email: '',
        //     selectedGender: '',
        //     birthday: '',
        //     phoneNumber: '',
        //     address: '',
        //     reason: '',
        //     genders: '',
        // });
        let birthday = new Date(patientInfo.birthday).getTime(); // => convert sang chuỗi timeStamp unix
        let res = await postPatientBookingAppointment({
            fullName: patientInfo.fullName,
            phoneNumber: patientInfo.phoneNumber,
            email: patientInfo.email,
            address: patientInfo.address,
            reason: patientInfo.reason,
            date: birthday,
            selectedGender: patientInfo.selectedGender.value,
            doctorId: patientInfo.doctorId,
            timeType: patientInfo.timeType,
        });

        if (res && res.errCode === 0) {
            toast.success('Đặt lịch thành công');
            closeBookingModal();
        } else {
            toast.error('Đặt lịch thất bại');
        }
    };

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
                        <span>
                            <FormattedMessage id='patient.booking-modal.title' />
                        </span>
                        <i className='close-modal fas fa-times' onClick={closeBookingModal}></i>
                    </div>
                    <div className='booking-modal-body container'>
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={dataTime.doctorId}
                                isShowDescription={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row form-group body-input'>
                            <div className='col-6 form-group'>
                                <label htmlFor='name'>
                                    <FormattedMessage id='patient.booking-modal.fullName' />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='name'
                                    // placeholder='Nhập họ tên'
                                    value={patientInfo.fullName}
                                    onChange={(e) => handleOnchangeInput(e, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor='email'>
                                    <FormattedMessage id='patient.booking-modal.email' />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='email'
                                    // placeholder='Nhập email'
                                    value={patientInfo.email}
                                    onChange={(e) => handleOnchangeInput(e, 'email')}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label htmlFor='birthday'>
                                    <FormattedMessage id='patient.booking-modal.DOB' />
                                </label>
                                <DatePicker
                                    value={patientInfo.birthday}
                                    className='form-control'
                                    id='birthday'
                                    onChange={handleOnchangeDatePicker}
                                />
                            </div>
                            <div className='col-4'>
                                <label htmlFor='gender'>
                                    <FormattedMessage id='patient.booking-modal.gender' />
                                </label>
                                <Select
                                    value={patientInfo.selectedGender}
                                    onChange={handleChangeSelect}
                                    options={patientInfo.genders}
                                />
                            </div>

                            <div className='col-4 form-group'>
                                <label htmlFor='phoneNumber'>
                                    <FormattedMessage id='patient.booking-modal.phoneNumber' />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='phoneNumber'
                                    // placeholder='Số điện thoại liên hệ (bắt buộc)'
                                    value={patientInfo.phoneNumber}
                                    onChange={(e) => handleOnchangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label htmlFor='address'>
                                    <FormattedMessage id='patient.booking-modal.address' />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='address'
                                    // placeholder='Địa chỉ'
                                    value={patientInfo.address}
                                    onChange={(e) => handleOnchangeInput(e, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label htmlFor='reason'>
                                    <FormattedMessage id='patient.booking-modal.issue' />
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='reason'
                                    // placeholder='Nhập lý do'
                                    value={patientInfo.reason}
                                    onChange={(e) => handleOnchangeInput(e, 'reason')}
                                />
                            </div>
                        </div>
                    </div>
                    <button className='btn-booking-confirm' onClick={() => handleConfirmBooking()}>
                        <FormattedMessage id='patient.booking-modal.confirm' />
                    </button>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders, // admin from adminReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
