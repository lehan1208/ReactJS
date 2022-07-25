import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
// import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

function ManagePatient({ language, user }) {
    const [currentDate, setCurrentDate] = useState(moment(new Date()).startOf('day'.valueOf()));
    const [dataPatient, setDataPatient] = useState([]);

    useEffect(() => {
        let formattedDate = new Date(currentDate).getTime();
        async function fetchData() {
            let res = await getListPatientForDoctor({
                doctorId: user.id,
                date: formattedDate,
            });

            if (res && res.errCode === 0) {
                setDataPatient(res.data);
            }
        }
        fetchData();
    }, [currentDate, user]);

    console.log('🚀 ~ file: ManagePatient.js ~ line 12 ~ ManagePatient ~ dataPatient', dataPatient);

    const handleOnchangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    const handleBtnConfirm = () => {};
    const handleBtnRemedy = () => {};

    return (
        <div className='manage-patient-container'>
            <div className='manage-patient-title'>Quản lý bệnh nhân khám bệnh</div>
            <div className='manage-patient-body container my-5'>
                <div className='col-4 form-group'>
                    <label htmlFor='date'>Chọn ngày khám</label>
                    <DatePicker
                        value={currentDate}
                        className='form-control'
                        id='date'
                        onChange={handleOnchangeDatePicker}
                    />
                </div>
                <div className='col-12 mt-5'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th scope='col'>STT</th>
                                <th scope='col'>Thời gian</th>
                                <th scope='col'>Họ và tên</th>
                                <th scope='col'>Địa chỉ</th>
                                <th scope='col'>Giới tính</th>
                                <th scope='col'>Số điện thoại</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPatient && dataPatient.length > 0 ? (
                                dataPatient.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.timeTypeDataPatient.valueVi}</td>
                                        <td>{item.patientData.firstName}</td>
                                        <td>{item.patientData.address}</td>
                                        <td>{item.patientData.genderData.valueVi}</td>
                                        <td>{item.patientData.phoneNumber}</td>
                                        <td>
                                            <button
                                                className='mp-btn-confirm'
                                                onClick={() => handleBtnConfirm()}
                                            >
                                                Xác nhận
                                            </button>
                                            <button
                                                className='mp-btn-remedy'
                                                onClick={() => handleBtnRemedy()}
                                            >
                                                Gửi hóa đơn
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <th>NO DATA</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
