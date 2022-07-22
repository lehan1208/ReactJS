import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
// import { FormattedMessage } from 'react-intl';

function VerifyEmail({ language }) {
    const [statusVerify, setStatusVerify] = useState(false);
    const [errCode, setErrCode] = useState(0);

    useEffect(() => {
        async function fetchData() {
            if (window.location && window.location.search) {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');
                const doctorId = urlParams.get('doctorId');

                let res = await postVerifyBookAppointment({
                    token: token,
                    doctorId: doctorId,
                });

                if (res && res.errCode === 0) {
                    setStatusVerify(true);
                    setErrCode(res.errCode);
                } else {
                    setStatusVerify(true);
                    setErrCode(res && res.errCode ? res.errCode : -1);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <HomeHeader isShowBanner={false} />
            <div className='verify-email-container'>
                {statusVerify === false ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {errCode === 0 ? (
                            <div className='info-booking'>Xác nhận lịch hẹn thành công!</div>
                        ) : (
                            <div className='info-booking'>
                                Lịch hẹn không tồn tại hoặc đã được xác nhận!
                            </div>
                        )}
                    </div>
                )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
