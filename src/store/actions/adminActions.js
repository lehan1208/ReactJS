import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUser,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getALlDoctor,
    saveInfoDoctor,
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

// GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetch Gender Failed', e);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

// POSITION
export const fetchPositionStart = () => {
    return async (dispatch, state) => {
        try {
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (err) {
            dispatch(fetchPositionFailed());
            console.log('Fetching position failed: ', err);
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

// ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (err) {
            dispatch(fetchRoleFailed());
            console.log('Fetching Role failed: ', err);
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (newUserData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(newUserData); //ref => userService.js
            if (res && res.errCode === 0) {
                toast.success('Create new user successfully!!');
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(createUserFailed());
                console.log('Failed to create new user: ');
            }
        } catch (err) {
            dispatch(createUserFailed());
            console.log('Fetching Role failed: ', err);
        }
    };
};

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL');
            console.log('🚀 ~ file: adminActions.js ~ line 124 ~ return ~ res', res);

            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (err) {
            dispatch(fetchAllUserFailed());
            console.log('Fetching Role failed: ', err);
        }
    };
};

export const fetchAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    userData: users,
});

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
});

// DELETE

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId); //ref => userService.js
            if (res && res.errCode === 0) {
                toast.success('Delete user successfully!!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUserFailed());
                toast.success('Delete user error!!');
            }
        } catch (err) {
            dispatch(deleteUserFailed());
            console.log('Fetching Role failed: ', err);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userData); //ref => userService.js
            console.log(userData);
            if (res && res.errCode === 0) {
                toast.success('Update user successfully!!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(editUserFailed());
                toast.warning('Update user error!!');
            }
        } catch (err) {
            dispatch(editUserFailed());
            console.log('Fetching Role failed: ', err);
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            console.log('🚀 ~ file: adminActions.js ~ line 206 ~ return ~ res', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getALlDoctor();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    allDoctor: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            });
        }
    };
};

export const saveDetailDoctor = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInfoDoctor(inputData);

            if (res && res.errCode === 0) {
                toast.success('Save doctor"s info successfully!!');
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
                });
            } else {
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
                });
                toast.error('Save doctor"s info failed!!');
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_SUCCESS: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
            });
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                toast.error('Create appointment failed!!');
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_SUCCESS: ', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });

            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = { resPrice: resPrice.data, resPayment: resPayment.data, resProvince: resProvince.data };
                dispatch(fetchRequiredDoctorInfoSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInfoFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInfoFailed());
            console.log('fetchRequiredDoctorInfoFailed', e);
        }
    };
};

export const fetchRequiredDoctorInfoSuccess = (allRequiredDoctorInfo) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    allRequiredDoctorInfo: allRequiredDoctorInfo,
});
export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
