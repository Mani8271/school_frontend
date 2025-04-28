import * as types from "../../actions/actionTypes";
const initialState = {
  createEmailLoginDetails: {
    users: [],
    token: null,
    loading: false,
  },
};
const LoginwithemailReducer = (
  state = initialState.createEmailLoginDetails,
  action
) => {
  switch (action.type) {
    case types.EMAIL_LOGIN_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.EMAIL_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.EMAIL_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default LoginwithemailReducer;