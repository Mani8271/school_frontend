import * as types from "../../actions/actionTypes";

const initialState = {
  forgotPasswordDetails: {
    loading: false,
    success: false,
    error: null,
  },
};

const forgotPasswordReducer = (
  state = initialState.forgotPasswordDetails,
  action
) => {
  switch (action.type) {
    case types.FORGOT_PASSWORD_START:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case types.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
