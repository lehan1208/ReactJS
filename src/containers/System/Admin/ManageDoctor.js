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
import { FormattedMessage } from 'react-intl';

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
    const [listClinic, setListClinic] = useState([]);
    const [listSpecialty, setListSpecialty] = useState([]);

    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedClinic, setSelectedClinic] = useState('');

    const [onChangeText, setOnChangeText] = useState({
        nameClinic: '',
        addressClinic: '',
        note: '',
        clinicId: '',
        specialtyId: '',
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
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    return result.push(object);
                });
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
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
            specialtyId:
                selectedSpecialty && selectedSpecialty.value ? selectedSpecialty.value : '',
            clinicId: selectedClinic && selectedClinic.value ? selectedClinic.value : '',
        });
    };

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
            case 'selectedSpecialty':
                setSelectedSpecialty(selectOption);
                break;
            case 'selectedClinic':
                setSelectedClinic(selectOption);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = allRequiredDoctorInfo;

        let dataSelectPrice = buildDataInputSelect(resPrice, 'PRICE');
        let dataSelectPayment = buildDataInputSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = buildDataInputSelect(resProvince, 'PROVINCE');
        let dataSelectSpecialty = buildDataInputSelect(resSpecialty, 'SPECIALTY');
        let dataSelectClinic = buildDataInputSelect(resClinic, 'CLINIC');

        setListPrice(dataSelectPrice);
        setListPayment(dataSelectPayment);
        setListProvince(dataSelectProvince);
        setListSpecialty(dataSelectSpecialty);
        setListClinic(dataSelectClinic);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allRequiredDoctorInfo]);

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

                let specialtyId = res.data.Doctor_Info.specialtyId;
                let clinicId = res.data.Doctor_Info.clinicId;

                let selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                let selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                let selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });

                let selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                });
                let selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId;
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
                setSelectedSpecialty(selectedSpecialty);
                setSelectedClinic(selectedClinic);
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
            setSelectedPrice('');
            setSelectedPayment('');
            setSelectedProvince('');
            setSelectedSpecialty('');
            setSelectedClinic('');
        }
    };

    return (
        <div className='manage-doctor-container'>
            <div className='manage-doctor-title'>
                <FormattedMessage id='admin.manage-doctor.title' />
            </div>
            <div className='more-info'>
                <div className='form-group row'>
                    <div className='content-left col-4'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.select-doctor' />
                        </label>
                        <Select
                            value={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={listDoctor}
                            placeholder={
                                <FormattedMessage id='admin.manage-doctor.select-doctor' />
                            }
                        />
                    </div>
                    <div className='content-right col-8'>
                        <label htmlFor='info'>
                            <FormattedMessage id='admin.manage-doctor.intro' />
                        </label>
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
                    <label htmlFor=''>
                        <FormattedMessage id='admin.manage-doctor.price' />
                    </label>
                    <Select
                        // placeholder={'Chọn giá'}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listPrice}
                        value={selectedPrice}
                        name='selectedPrice'
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>
                        <FormattedMessage id='admin.manage-doctor.payment' />
                    </label>
                    <Select
                        // placeholder={'Chọn thanh toán'}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listPayment}
                        value={selectedPayment}
                        name='selectedPayment'
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>
                        <FormattedMessage id='admin.manage-doctor.province' />
                    </label>
                    <Select
                        onChange={handleChangeSelectDoctorInfo}
                        options={listProvince}
                        value={selectedProvince}
                        name='selectedProvince'
                        placeholder={<FormattedMessage id='admin.manage-doctor.province' />}
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>
                        <FormattedMessage id='admin.manage-doctor.nameClinic' />
                    </label>
                    <input
                        value={onChangeText.nameClinic}
                        type=''
                        className='form-control'
                        onChange={(e) => handleOnchangeText(e, 'nameClinic')}
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>
                        <FormattedMessage id='admin.manage-doctor.addressClinic' />
                    </label>
                    <input
                        value={onChangeText.addressClinic}
                        type=''
                        className='form-control'
                        onChange={(e) => handleOnchangeText(e, 'addressClinic')}
                    />
                </div>
                <div className='col-4 form-group'>
                    <label htmlFor=''>
                        <FormattedMessage id='admin.manage-doctor.note' />
                    </label>
                    <input
                        value={onChangeText.note}
                        type=''
                        className='form-control'
                        onChange={(e) => handleOnchangeText(e, 'note')}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-4 form-group'>
                    <label>
                        <FormattedMessage id='admin.manage-doctor.specialty' />
                    </label>
                    <Select
                        placeholder={<FormattedMessage id='admin.manage-doctor.specialty' />}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listSpecialty}
                        value={selectedSpecialty}
                        name='selectedSpecialty'
                    />
                </div>
                <div className='col-4 form-group'>
                    <label>
                        <FormattedMessage id='admin.manage-doctor.select-clinic' />
                    </label>
                    <Select
                        onChange={handleChangeSelectDoctorInfo}
                        options={listClinic}
                        value={selectedClinic}
                        name='selectedClinic'
                        placeholder={<FormattedMessage id='admin.manage-doctor.select-clinic' />}
                    />
                </div>
            </div>
            <div className='manage-doctor-editor'>
                <MdEditor
                    style={{ height: '300px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown || ''}
                />
            </div>

            <button className='save-content-doctor' onClick={() => handleSaveContentMarkDown()}>
                <FormattedMessage id='admin.manage-doctor.save' />
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
