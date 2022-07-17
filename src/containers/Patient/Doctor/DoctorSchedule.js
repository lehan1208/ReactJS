import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils/';
import { getScheduleByDate } from '../../../services/userService';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import localization from 'moment/locale/vi';

function DoctorSchedule({ language }) {
    const { id } = useParams();
    const [allDays, setAllDays] = useState([]);
    const [availableTime, setAvailableTime] = useState([]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = capitalizeFirstLetter(labelVi);
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); //unix time

            allDays.push(object);
        }
        setAllDays(allDays);
    }, [language, allDays]);

    const handleOnChangeSelect = (e) => {
        let doctorId = id;
        let date = e.target.value;
        async function fetchData() {
            let res = await getScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                setAvailableTime(res.data ? res.data : []);
            }
        }
        fetchData();
    };

    return (
        <div className='doctor-schedule-container'>
            <div className='all-schedule'>
                <select onChange={(e) => handleOnChangeSelect(e)}>
                    {allDays &&
                        allDays.length > 0 &&
                        allDays.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                </select>
            </div>
            <div className='all-time-available'>
                <div className='text-calendar'>
                    <i className='fas fa-calendar-alt'></i>
                    <span>Lịch khám</span>
                </div>
                <div className='time-container'>
                    {availableTime && availableTime.length > 0 ? (
                        <>
                            <div className='time-content'>
                                {availableTime.map((item, index) => {
                                    let timeDisplay =
                                        language === LANGUAGES.VI
                                            ? item.timeTypeData.valueVi
                                            : item.timeTypeData.valueEn;
                                    return <button key={index}>{timeDisplay}</button>;
                                })}
                            </div>

                            <div className='book-free px-3 pb-3'>
                                <span>Chọn</span>
                                <i className='far fa-hand-pointer mx-2'></i>
                                <span>và đặt (Phí đặt lịch 0đ)</span>
                            </div>
                        </>
                    ) : (
                        <div className='no-appointment'>
                            Bác sĩ không có lịch hẹn trong thời gian này. Vui lòng chọn thời gian khác
                        </div>
                    )}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
