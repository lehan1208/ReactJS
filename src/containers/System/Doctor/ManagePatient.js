import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
// import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';

function ManagePatient({ language }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    useEffect(() => {}, []);

    const handleOnchangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

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
                    <table class='table table-bordered'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>First</th>
                                <th scope='col'>Last</th>
                                <th scope='col'>Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope='row'>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope='row'>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope='row'>3</th>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                            </tr>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
