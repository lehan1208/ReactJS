import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/';
import { getDetailInfoDoctor } from '../.../../../../services/userService';

const options = [
    { value: 'doctor', label: 'Bác sĩ' },
    { value: 'master', label: 'Thạc sĩ' },
    { value: 'Professor', label: 'Tiến sĩ' },
];

const mdParser = new MarkdownIt();
function ManageDoctor({ fetchAllDoctor, allDoctor, language, saveDetailDoctor }) {
    const [selectedDoctor, setSelectedDoctor] = useState('test');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [description, setDescription] = useState('');
    const [listDoctor, setListDoctor] = useState([]);

    useEffect(() => {
        fetchAllDoctor();
    }, []);

    // Build data input từ listDoctor => options
    const buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName} `;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                return result.push(object);
            });
        }
        return result;
    };

    useEffect(() => {
        let doctorSelectOption = buildDataInputSelect(allDoctor);
        setListDoctor(doctorSelectOption);
    }, [allDoctor, language]);

    function handleEditorChange({ html, text }) {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleSaveContentMarkDown = () => {
        // saveDetailDoctor(data)
        saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value,
        });

        // setDescription(description);
    };

    const handleChangeSelect = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor);
        let res = await getDetailInfoDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markDown = res.data.Markdown;
            setContentHTML(markDown.contentHTML);
            setContentMarkdown(markDown.contentMarkdown);
            setDescription(markDown.description);
            // setHasOldData(true);
        } else {
            // Nếu không có Markdown
            setContentHTML('');
            setContentMarkdown('');
            setDescription('');
            // setHasOldData(false);
        }
        console.log(
            '🚀 ~ file: ManageDoctor.js ~ line 79 ~ handleChangeSelect ~ res.data',
            res.data
        );
    };

    return (
        <div className='manage-doctor-container'>
            <div className='manage-doctor-title'>HELLO FROM MANAGE DOCTOR </div>
            <div className='more-info'>
                <div className='form-group row'>
                    <div className='content-left col-6'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={listDoctor}
                        />
                    </div>
                    <div className='content-right col-6'>
                        <label htmlFor='info'> Thông tin giới thiệu</label>
                        <textarea
                            className='form-control mb-2'
                            id='info'
                            rows='4'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description || ''}
                        >
                            Hello
                        </textarea>
                    </div>
                </div>
            </div>

            <div className='manage-doctor-editor'>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown || ''}
                />
            </div>

            <button className='save-content-doctor' onClick={() => handleSaveContentMarkDown()}>
                Lưu thông tin
            </button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        // userRedux: state.admin.users, // ref => adminReducer.js (admin from rootReducer.js)
        allDoctor: state.admin.getAllDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        // fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        // deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
