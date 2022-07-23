import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils/';
import { getScheduleByDate } from '../../../services/userService';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

function DoctorSchedule({ language, idFromParent }) {
    const [allDays, setAllDays] = useState([]);
    const [availableTime, setAvailableTime] = useState([]);
    const [isShowBookingModal, setIsShowBookingModal] = useState(false);
    const [dataScheduleTimeModal, setDataScheduleTimeModal] = useState({});

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
                    let labelVi = moment(new Date())
                        .add(i, 'days')
                        .locale('en')
                        .format('dddd - DD/MM');
                    object.label = capitalizeFirstLetter(labelVi);
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); //unix time

            allDays.push(object);
        }
        setAllDays(allDays);
    }, [language]);

    const handleOnChangeSelect = (e) => {
        let doctorId = idFromParent;
        let date = e.target.value;
        async function fetchData() {
            let res = await getScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                setAvailableTime(res.data ? res.data : []);
            }
        }
        fetchData();
    };

    const handleClickScheduleTime = (time) => {
        setIsShowBookingModal(true);
        setDataScheduleTimeModal(time);
    };

    const closeBookingModal = () => {
        setIsShowBookingModal(false);
    };
    return (
        <>
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
                        <span>
                            <FormattedMessage id='patient.detail-doctor.schedule' />
                        </span>
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
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleClickScheduleTime(item)}
                                            >
                                                {timeDisplay}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className='book-free px-3 pb-3'>
                                    <span>
                                        <FormattedMessage id='patient.detail-doctor.choose' />
                                    </span>
                                    <i className='far fa-hand-pointer mx-2'></i>
                                    <span>
                                        <FormattedMessage id='patient.detail-doctor.book-free' />
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className='no-appointment'>
                                <FormattedMessage id='patient.detail-doctor.no-schedule' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <BookingModal
                isShowBookingModal={isShowBookingModal}
                closeBookingModal={closeBookingModal}
                dataTime={dataScheduleTimeModal}
            />
        </>
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
