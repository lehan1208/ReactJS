import React, { useState } from 'react';
import { connect } from 'react-redux';
import './ManageHandBook.scss';
// import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import { createClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

function ManageHandBook({ language }) {
    const [handbookInfo, setHandbookInfo] = useState({
        name: '',
        imageBase64: '',
    });
    const [description, setDescription] = useState({
        descriptionHTML: '',
        descriptionMarkdown: '',
    });

    const handleChangeInput = (e, key) => {
        let newInfo = { ...handbookInfo };
        newInfo[key] = e.target.value;
        setHandbookInfo(newInfo);
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
            setHandbookInfo({ ...handbookInfo, imageBase64: base64 });
        }
    };

    const handleCreateClinic = async () => {
        let data = {
            ...description,
            ...handbookInfo,
        };
        const res = await createClinic(data);
        if (res && res.errCode === 0) {
            toast.success('Create specialty success!');
            setDescription({
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
            setHandbookInfo({
                name: '',
                imageBase64: null,
            });
            document.getElementById('uploadSpecialtyImage').value = '';
        } else {
            toast.error('Create specialty fail!');
            console.log('🚀 ~ file: ManageHandBook.js ~ line 53 ~ handleSaveSpecialty ~ res', res);
        }
    };

    return (
        <div className='manage-handbook-container'>
            <div className='manage-handbook-title'> Quản lý cẩm nang</div>
            <div className='add-new-handbook row'>
                <div className='col-6 form-group'>
                    <label>Tiêu đề</label>
                    <input
                        className='form-control'
                        type='text'
                        value={handbookInfo.name}
                        onChange={(e) => handleChangeInput(e, 'name')}
                    />
                </div>
                <div className='col-6 form-group'>
                    <label>Ảnh cẩm nang</label>
                    <input
                        className='form-control-file'
                        type='file'
                        id='uploadSpecialtyImage'
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
                    <button className='btn-save-handbook' onClick={() => handleCreateClinic()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
