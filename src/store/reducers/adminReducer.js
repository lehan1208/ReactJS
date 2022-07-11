import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log('Fire fetch gender start: ', action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      console.log('Fire fetch gender success: ', state);
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      console.log('Fire fetch gender failed: ', action);
      return {
        ...state,
      };

    // position
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      console.log('Fire fetch position success: ', state);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      console.log('Fire fetch position failed: ', action);
      return {
        ...state,
      };

    // role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      console.log('Fire fetch role success: ', state);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      console.log('Fire fetch role failed: ', action);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
