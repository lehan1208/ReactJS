import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt();
function ManageDoctor({
    fetchAllDoctor,
    allDoctor,
    language,
    saveDetailDoctor,
    getRequiredDoctorInfo,
    allRequiredDoctorInfo,
}) {
    // Save to markdown table
    const [selectedDoctor, setSelectedDoctor] = useState('test');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [description, setDescription] = useState('');
    const [listDoctor, setListDoctor] = useState([]);

    // Save to doctor_info table
    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');

    const [onChangeText, setOnChangeText] = useState({
        nameClinic: '',
        addressClinic: '',
        note: '',
    });

    const handleOnchangeText = (e, id) => {
        let onChangeTextCopy = { ...onChangeText };
        onChangeTextCopy[id] = e.target.value;
        setOnChangeText({ ...onChangeTextCopy });
    };
    useEffect(() => {
        fetchAllDoctor();
        getRequiredDoctorInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'USER') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    let labelVi = `${item.lastName} ${item.firstName}`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    return result.push(object);
                });
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    return result.push(object);
                });
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    return result.push(object);
                });
            }
            return result;
        }
    };

    // Build data input từ listDoctor => options

    useEffect(() => {
        let doctorSelectOption = buildDataInputSelect(allDoctor, 'USER');
        setListDoctor(doctorSelectOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            selectedPrice: selectedPrice,
            selectedPayment: selectedPayment,
            selectedProvince: selectedProvince,
            nameClinic: onChangeText.nameClinic,
            addressClinic: onChangeText.addressClinic,
            note: onChangeText.note,
        });
    };

    const handleChangeSelect = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor);
        let res = await getDetailInfoDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markDown = res.data.Markdown;

            if (res.data.Doctor_Info) {
                let addressClinic = res.data.Doctor_Info.addressClinic;
                let note = res.data.Doctor_Info.note;
                let nameClinic = res.data.Doctor_Info.nameClinic;

                let priceId = res.data.Doctor_Info.priceId;
                let paymentId = res.data.Doctor_Info.paymentId;
                let provinceId = res.data.Doctor_Info.provinceId;

                let selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                let selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                let selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });

                setContentHTML(markDown.contentHTML);
                setContentMarkdown(markDown.contentMarkdown);
                setDescription(markDown.description);
                setOnChangeText({
                    nameClinic: nameClinic,
                    addressClinic: addressClinic,
                    note: note,
                });
                setSelectedPrice(selectedPrice);
                setSelectedPayment(selectedPayment);
                setSelectedProvince(selectedProvince);
            }
        } else {
            // Nếu không có Markdown
            setContentHTML('');
            setContentMarkdown('');
            setDescription('');
            setOnChangeText({
                nameClinic: '',
                addressClinic: '',
                note: '',
            });
        }
    };
    console.log('selectedPrice: ', selectedPrice, 'selectedProvince: ', selectedProvince);

    const handleChangeSelectDoctorInfo = async (selectOption, name) => {
        let stateName = name.name;
        switch (stateName) {
            case 'selectedPrice':
                setSelectedPrice(selectOption);
                break;
            case 'selectedPayment':
                setSelectedPayment(selectOption);
                break;
            case 'selectedProvince':
                setSelectedProvince(selectOption);

                break;
            default:
                break;
        }
    };

    useEffect(() => {
        let { resPrice, resPayment, resProvince } = allRequiredDoctorInfo;

        let dataSelectPrice = buildDataInputSelect(resPrice, 'PRICE');
        let dataSelectPayment = buildDataInputSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = buildDataInputSelect(resProvince, 'PROVINCE');

        setListPrice(dataSelectPrice);
        setListPayment(dataSelectPayment);
        setListProvince(dataSelectProvince);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allRequiredDoctorInfo]);

    return (
        <div className='manage-doctor-container'>
            <div className='manage-doctor-title'>TẠO THÊM THÔNG TIN BÁC SĨ</div>
            <div className='more-info'>
                <div className='form-group row'>
                    <div className='content-left col-6'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={listDoctor}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right col-6'>
                        <label htmlFor='info'>Thông tin giới thiệu</label>
                        <textarea
                            className='form-control mb-2'
                            id='info'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description || ''}
                        >
                            Hello
                        </textarea>
                    </div>
                </div>
            </div>

            <div className='more-info-extra row '>
                <div className='col-4 form-group'>
                    <label htmlFor=''>Chọn giá</label>
                    <Select
                        placeholder={'Chọn giá'}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listPrice}
                        value={selectedPrice}
                        name='selectedPrice'
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>Chọn phương thức thanh toán</label>
                    <Select
                        placeholder={'Chọn thanh toán'}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listPayment}
                        value={selectedPayment}
                        name='selectedPayment'
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>Chọn tỉnh thành</label>
                    <Select
                        onChange={handleChangeSelectDoctorInfo}
                        options={listProvince}
                        value={selectedProvince}
                        name='selectedProvince'
                        placeholder={'Chọn tỉnh thành'}
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>Tên phòng khám</label>
                    <input
                        type=''
                        className='form-control'
                        onChange={(e) => handleOnchangeText(e, 'nameClinic')}
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>Địa chỉ phòng khám</label>
                    <input
                        type=''
                        className='form-control'
                        onChange={(e) => handleOnchangeText(e, 'addressClinic')}
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>Note</label>
                    <input
                        type=''
                        className='form-control'
                        onChange={(e) => handleOnchangeText(e, 'note')}
                    />
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
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),

        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
