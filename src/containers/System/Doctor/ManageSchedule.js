import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

function ManageSchedule(props) {
    const { fetchAllDoctor, language, allDoctor, fetchAllScheduleTime, allScheduleTime } = props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    const [listDoctor, setListDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [rangeTime, setRangeTime] = useState([]);
    useEffect(() => {
        fetchAllDoctor();
        fetchAllScheduleTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allDoctor, allScheduleTime]);

    const handleOnchangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    const handleClickBtnTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            let rangeTimeSelected = rangeTime.map((item) => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            });
            setRangeTime(rangeTimeSelected);
        }
    };

    const handleSaveSchedule = async () => {
        let result = [];
        if (!currentDate) {
            toast.error('Invalid date!!');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!!');
            return;
        }

        let formattedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    return result.push(object);
                });
            } else {
                toast.error('Invalid selected time!!');
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate,
        });

        if (res && res.errCode === 0) {
            toast.success('Save Info Succeed !!');
        } else {
            toast.error('Error save bulk !!');
            console.log("'Error save bulk !!", res);
        }
    };

    return (
        <div className='manage-schedule-container'>
            <div className='m-s-title'>Quản lý kế hoạch khám bệnh</div>
            <div className='container'>
                <div className='row'>
                    <div className='col-6 form-group'>
                        <label htmlFor='doctor'>Chọn bác sĩ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={listDoctor}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label htmlFor='date'>Ngày khám</label>
                        <DatePicker
                            value={currentDate}
                            minDate={yesterday}
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
                                        item.isSelected === true
                                            ? 'active btn btn-schedule'
                                            : ' btn btn-schedule'
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
