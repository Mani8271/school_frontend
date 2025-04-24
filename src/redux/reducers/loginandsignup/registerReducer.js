import * as types from "../../actions/actionTypes";

const initialState = {
  registerDetails: {
    users: [],
    token: null,
    loading: false,
    error: null,
  },
};

const registerReducer = (
  state = initialState.registerDetails,
  action
) => {
  switch (action.type) {
    case types.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        // Optionally extract and store token or user info here
        token: action.payload?.data?.token || null,
        users: action.payload?.data?.user ? [action.payload.data.user] : [],
      };
    case types.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
