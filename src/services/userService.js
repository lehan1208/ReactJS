import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
};

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, {
        id: inputId,
    });
};

const createNewUserService = (newUserData) => {
    return axios.post('/api/create-new-user', newUserData);
};

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } });
};

const editUserService = (userData) => {
    return axios.put('/api/edit-user', userData);
};

let getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getALlDoctor = () => {
    return axios.get(`/api/get-all-doctor`);
};

const saveInfoDoctor = (inputData) => {
    return axios.post('/api/save-info-doctor', inputData);
};

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

export {
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getALlDoctor,
    saveInfoDoctor,
    getDetailInfoDoctor,
};
