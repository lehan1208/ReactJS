import actionTypes from './actionTypes';
import {
  getAllCodeService,
  createNewUserService,
} from '../../services/userService';

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
      console.log('Hoc Lap Trinh: ', res);
      if (res && res.errCode === 0) {
        dispatch(createUserSuccess());
      } else {
        dispatch(createUserFailed());
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
