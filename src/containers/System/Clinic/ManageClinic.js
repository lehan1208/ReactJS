import React, { useState } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss';
// import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import { createClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

function ManageClinic({ language }) {
    const [clinicInfo, setClinicInfo] = useState({
        name: '',
        address: '',
        imageBase64: '',
    });
    const [description, setDescription] = useState({
        descriptionHTML: '',
        descriptionMarkdown: '',
    });

    const handleChangeInput = (e, key) => {
        let newInfo = { ...clinicInfo };
        newInfo[key] = e.target.value;
        setClinicInfo(newInfo);
    };

    const handleEditorChange = ({ html, text }) => {
        setDescription({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    const handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setClinicInfo({ ...clinicInfo, imageBase64: base64 });
        }
    };

    const handleCreateClinic = async () => {
        let data = {
            ...description,
            ...clinicInfo,
        };
        const res = await createClinic(data);
        if (res && res.errCode === 0) {
            toast.success('Create specialty success!');
            setDescription({
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
            setClinicInfo({
                name: '',
                address: '',
                imageBase64: null,
            });
            document.getElementById('uploadSpecialtyImage').value = '';
        } else {
            toast.error('Create specialty fail!');
            console.log('🚀 ~ file: ManageClinic.js ~ line 53 ~ handleSaveSpecialty ~ res', res);
        }
    };

    return (
        <div className='manage-specialty-container'>
            <div className='manage-specialty-title'> Quản lý phòng khám</div>
            <div className='add-new-specialty row'>
                <div className='col-6 form-group'>
                    <label>Tên phòng khám</label>
                    <input
                        className='form-control'
                        type='text'
                        value={clinicInfo.name}
                        onChange={(e) => handleChangeInput(e, 'name')}
                    />
                </div>
                <div className='col-6 form-group'>
                    <label>Ảnh phòng khám</label>
                    <input
                        className='form-control-file'
                        type='file'
                        id='uploadSpecialtyImage'
                        onChange={(e) => handleOnchangeImage(e)}
                    />
                </div>
                <div className='col-12 form-group'>
                    <label>Địa chỉ phòng khám</label>
                    <input
                        className='form-control'
                        type='text'
                        value={clinicInfo.address}
                        onChange={(e) => handleChangeInput(e, 'address')}
                    />
                </div>
                <div className='col-12'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={description.descriptionMarkdown || ''}
                    />
                </div>
                <div className='col-12 mt-3'>
                    <button className='btn-save-specialty' onClick={() => handleCreateClinic()}>
                        Create
                    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
