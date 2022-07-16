import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';

function ManageSchedule(props) {
    const { isLoggedIn, fetchAllDoctor, language, allDoctor, fetchAllScheduleTime, allScheduleTime } = props;

    const [listDoctor, setListDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [rangeTime, setRangeTime] = useState([]);
    useEffect(() => {
        fetchAllDoctor();
        fetchAllScheduleTime();
    }, []);

    const handleChangeSelect = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor);
    };

    const buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName} `;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                return result.push(object);
            });
        }
        return result;
    };

    useEffect(() => {
        let doctorSelectOption = buildDataInputSelect(allDoctor);
        let data = allScheduleTime;
        if (data && data.length > 0) {
            data = data.map((item) => ({ ...item, isSelected: false }));
        }
        setListDoctor(doctorSelectOption);
        setRangeTime(data);
    }, [allDoctor, allScheduleTime]);

    const handleOnchangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    const handleClickBtnTime = (time) => {
        console.log('🚀 ~ file: ManageSchedule.js ~ line 60 ~ handleClickBtnTime ~ item', time);
        if (rangeTime && rangeTime.length > 0) {
            let rangeTime2 = rangeTime.map((item) => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            });
            setRangeTime(rangeTime2);
        }
    };

    const handleSaveSchedule = () => {
        console.log('Check selectedDoctor: ', selectedDoctor);
        console.log('Check currentDate: ', moment(currentDate).format('DD/MM/YYYY'));
        console.log('Check rangeTime: ', rangeTime);
        let result = [];

        if (!currentDate) {
            toast.error('Invalid date!!');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!!');
            return;
        }
        let formattedDate = moment(currentDate).format('DD/MM/YYYY');
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => item.isSelected === true);
            console.log('🚀 ~ file: ManageSchedule.js ~ line 85 ~ handleSaveSchedule ~ selectedTime', selectedTime);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((time) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.time = time.keyMap;
                    return result.push(object);
                });
            } else {
                toast.error('Invalid selected time!!');
                return;
            }
        }
        console.log('🚀 ~ file: ManageSchedule.js ~ line 94 ~ handleSaveSchedule ~ result', result);
    };

    return (
        <div className='manage-schedule-container'>
            <div className='m-s-title'>Quản lý kế hoạch khám bệnh</div>
            <div className='container'>
                <div className='row'>
                    <div className='col-6 form-group'>
                        <label htmlFor='doctor'>Chọn bác sĩ</label>
                        <Select value={selectedDoctor} onChange={handleChangeSelect} options={listDoctor} />
                    </div>
                    <div className='col-6 form-group'>
                        <label htmlFor='date'>Ngày khám</label>
                        <DatePicker
                            value={currentDate}
                            minDate={new Date()}
                            className='form-control'
                            id='date'
                            onChange={handleOnchangeDatePicker}
                        />
                    </div>
                    <div className='col-12 pick-hour-container'>
                        {rangeTime &&
                            rangeTime.length > 0 &&
                            rangeTime.map((item, index) => (
                                <button
                                    key={index}
                                    className={
                                        item.isSelected === true ? 'active btn btn-schedule' : ' btn btn-schedule'
                                    }
                                    onClick={() => handleClickBtnTime(item)}
                                >
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </button>
                            ))}
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary' onClick={handleSaveSchedule}>
                            Đặt hẹn
                        </button>
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
        allDoctor: state.admin.getAllDoctor,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
