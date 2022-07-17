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
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let inHoa = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = capitalizeFirstLetter(inHoa);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd- DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); //unix time

            arrDate.push(object);
        }
        setAllDays(arrDate);
    }, [language]);

    const handleOnChangeSelect = (e) => {
        let doctorId = id;
        let date = e.target.value;
        async function fetchData() {
            let res = await getScheduleByDate(doctorId, date);
            console.log('🚀 ~ file: DoctorSchedule.js ~ line 32 ~ fetchData ~ res', res);

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
                    <i class='fas fa-calendar-alt'></i>
                    <span>Lịch khám</span>
                </div>
                <div className='time-container'>
                    {availableTime && availableTime.length > 0 ? (
                        availableTime.map((item, index) => {
                            let timeDisplay =
                                language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                            return <button key={index}>{timeDisplay}</button>;
                        })
                    ) : (
                        <div>Không có lịch hẹn trong thời gian này. Vui lòng chọn thời gian khác</div>
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
