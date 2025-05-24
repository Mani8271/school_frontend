import * as types from "../../actions/actionTypes";
const initialState = {
  updatedpayrolldetails: {
    updatedpayroll: [],
    loading: false,
  },
};
const UpdatepayrollReducer = (
  state = initialState.updatedpayrolldetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_PAYROLL_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PAYROLL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_PAYROLL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdatepayrollReducer;