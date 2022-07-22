import React, { useState } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
// import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import { createSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

function ManageSpecialty({ language }) {
    const [specialtyInfo, setSpecialtyInfo] = useState({
        name: '',
        imageBase64: '',
    });
    const [description, setDescription] = useState({
        descriptionHTML: '',
        descriptionMarkdown: '',
    });

    const handleChangeInput = (e, key) => {
        let newInfo = { ...specialtyInfo };
        newInfo[key] = e.target.value;
        setSpecialtyInfo(newInfo);
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
            setSpecialtyInfo({ ...specialtyInfo, imageBase64: base64 });
        }
    };

    const handleSaveSpecialty = async () => {
        let data = {
            ...description,
            ...specialtyInfo,
        };
        const res = await createSpecialty(data);
        if (res && res.errCode === 0) {
            toast.success('Create specialty success!');
        } else {
            toast.error('Create specialty fail!');
            console.log('🚀 ~ file: ManageSpecialty.js ~ line 53 ~ handleSaveSpecialty ~ res', res);
        }
    };

    return (
        <div className='manage-specialty-container'>
            <div className='manage-specialty-title'> Quản lý chuyên khoa</div>
            <div className='add-new-specialty row'>
                <div className='col-6 form-group'>
                    <label>Tên chuyên khoa</label>
                    <input
                        className='form-control'
                        type='text'
                        value={specialtyInfo.name}
                        onChange={(e) => handleChangeInput(e, 'name')}
                    />
                </div>
                <div className='col-6 form-group'>
                    <label>Ảnh chuyên khoa</label>
                    <input
                        className='form-control-file'
                        type='file'
                        onChange={(e) => handleOnchangeImage(e)}
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
                    <button className='btn-save-specialty' onClick={() => handleSaveSpecialty()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
