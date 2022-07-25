import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './RemedyModal.scss';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import * as actions from '../../../store/actions';
import { CommonUtils } from '../../../utils';

function RemedyModal({ language, isOpenRemedyModal, dataModal, closeRemedyModal, sendRemedy }) {
    const [modalInfo, setModalInfo] = useState({
        email: '',
        imageBase64: '',
    });
    useEffect(() => {
        setModalInfo({ ...modalInfo, email: dataModal.email });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataModal]);

    const handleOnchangeEmail = (e, key) => {
        let newInfo = { ...modalInfo };
        newInfo[key] = e.target.value;
        setModalInfo({ ...newInfo });
    };

    const handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setModalInfo({ ...modalInfo, imageBase64: base64 });
        }
    };

    const handleSendRemedy = () => {
        sendRemedy(modalInfo);
    };

    return (
        <div>
            <Modal
                isOpen={isOpenRemedyModal}
                size='lg'
                centered
                className='booking-modal-container'
                backdrop={true}
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>Gửi hóa đơn khám bệnh thành công</h5>
                    <button
                        type='button'
                        className='close'
                        aria-label='Close'
                        onClick={closeRemedyModal}
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input
                                type='email'
                                value={modalInfo.email || ''}
                                className='form-control'
                                onChange={(e) => handleOnchangeEmail(e, 'email')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn hóa đơn</label>
                            <input
                                type='file'
                                className='form-control-file'
                                onChange={(e) => handleOnchangeImage(e)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='btn btn-send' onClick={handleSendRemedy}>
                        Send
                    </Button>
                    <Button color='secondary' className='btn btn-cancel' onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders, // admin from adminReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
