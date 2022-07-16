import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { range } from 'lodash';

function ManageSchedule(props) {
    const { isLoggedIn, fetchAllDoctor, language, allDoctor, fetchAllScheduleTime, allScheduleTime } = props;

    const [listDoctor, setListDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('test');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [rangeTime, setRangeTime] = useState([]);
    useEffect(() => {
        fetchAllDoctor();
        fetchAllScheduleTime();
    }, []);

    const handleChangeSelect = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor);
        console.log('🚀 ~ file: ManageSchedule.js ~ line 12 ~ ManageSchedule ~ allScheduleTime', allScheduleTime);
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
        setListDoctor(doctorSelectOption);
        setRangeTime(allScheduleTime);
    }, [allDoctor, allScheduleTime]);

    const handleOnchangeDatePicker = (date) => {
        setCurrentDate(date[0]);
        console.log('🚀 ~ file: ManageSchedule.js ~ line 51 ~ handleOnchangeDatePicker ~ date', rangeTime);
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
                                <button key={index} className='btn btn-schedule'>
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </button>
                            ))}
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary '>Đặt hẹn</button>
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
