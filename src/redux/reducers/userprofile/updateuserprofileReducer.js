import * as types from "../../actions/actionTypes";
const initialState = {
  updatedprofiledetails: {
    students: [],
    loading: false,
  },
};
const UpdateuserprofileReducer = (
  state = initialState.updatedprofiledetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_USER_PROFILE_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_USER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdateuserprofileReducer;