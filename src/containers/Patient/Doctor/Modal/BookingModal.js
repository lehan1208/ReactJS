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
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

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
    const [isLoading, setIsLoading] = useState(false);

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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');
            let timeType =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;

            return `  ${timeType} - ${capitalizeFirstLetter(date)}`;
        }
        return '';
    };
    const buildNameDoctor = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

            return name;
        }
        return '';
    };

    const handleConfirmBooking = async () => {
        setIsLoading(true);
        let birthday = new Date(patientInfo.birthday).getTime(); // => convert sang chuỗi timeStamp unix
        let timeString = buildTimeBooking(dataTime);
        let doctorName = buildNameDoctor(dataTime);

        let res = await postPatientBookingAppointment({
            fullName: patientInfo.fullName,
            phoneNumber: patientInfo.phoneNumber,
            email: patientInfo.email,
            address: patientInfo.address,
            reason: patientInfo.reason,
            date: dataTime.date,
            birthday: birthday,
            selectedGender: patientInfo.selectedGender.value,
            doctorId: patientInfo.doctorId,
            timeType: patientInfo.timeType,
            language: language,
            timeString: timeString,
            doctorName: doctorName,
        });

        if (res && res.errCode === 0) {
            setIsLoading(false);
            toast.success('Đặt lịch thành công');
            closeBookingModal();
        } else {
            setIsLoading(false);
            toast.error('Đặt lịch thất bại');
        }
    };

    return (
        <>
            <LoadingOverlay active={isLoading} spinner text='Loading...'>
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
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
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
                        <button
                            className='btn-booking-confirm'
                            onClick={() => handleConfirmBooking()}
                        >
                            <FormattedMessage id='patient.booking-modal.confirm' />
                        </button>
                    </div>
                </Modal>
            </LoadingOverlay>
        </>
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
