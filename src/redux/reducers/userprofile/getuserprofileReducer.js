import * as types from "../../actions/actionTypes";
const initialState = {
  userdetails: {
    user: [],
    loading: false,
  },
};
const GetuserprofileReducer = (
  state = initialState.userdetails,
  action
) => {
  switch (action.type) {
    case types.GET_USER_PROFILE_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_USER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default GetuserprofileReducer;