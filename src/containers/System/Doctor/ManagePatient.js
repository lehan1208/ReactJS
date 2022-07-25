import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
// import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

function ManagePatient({ language, user }) {
    const [currentDate, setCurrentDate] = useState(moment(new Date()).startOf('day'.valueOf()));
    const [dataPatient, setDataPatient] = useState([]);
    const [isOpenRemedyModal, setIsOpenRemedyModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    let formattedDate = new Date(currentDate).getTime();

    const fetchData = useCallback(async () => {
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            setDataPatient(res.data);
        }
    }, [formattedDate, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOnchangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    const handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        setIsOpenRemedyModal(true);
        setDataModal(data);
    };

    const closeRemedyModal = () => {
        setIsOpenRemedyModal(false);
        setDataModal({});
    };

    const sendRemedy = async (dataChild) => {
        setIsLoading(true);
        let res = await postSendRemedy({
            email: dataChild.email,
            imageBase64: dataChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: language,
            patientName: dataModal.patientName,
            // ...dataFromModal
        });

        if (res && res.errCode === 0) {
            setIsLoading(false);
            toast.success('Gửi hóa đơn khám bệnh thành công');
            await fetchData();
            closeRemedyModal();
        } else {
            setIsLoading(false);
            toast.error('Gửi hóa đơn khám bệnh thất bại');
            console.log('🚀 ~ file: ManagePatient.js ~ line 62 ~ sendRemedy ~ res', res);
        }
    };

    return (
        <>
            <LoadingOverlay active={isLoading} spinner text='Loading...'>
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
                                        dataPatient.map((item, index) => {
                                            let time =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeDataPatient.valueVi
                                                    : item.timeTypeDataPatient.valueEn;
                                            let gender =
                                                language === LANGUAGES.VI
                                                    ? item.patientData.genderData.valueVi
                                                    : item.patientData.genderData.valueEn;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>{item.patientData.phoneNumber}</td>
                                                    <td>
                                                        <button
                                                            className='mp-btn-confirm'
                                                            onClick={() => handleBtnConfirm(item)}
                                                        >
                                                            Xác nhận
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan='7' style={{ textAlign: 'center' }}>
                                                No data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpenRemedyModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={closeRemedyModal}
                    sendRemedy={sendRemedy}
                />
            </LoadingOverlay>
        </>
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
