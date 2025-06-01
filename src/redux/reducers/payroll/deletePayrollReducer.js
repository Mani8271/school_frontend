import * as types from "../../actions/actionTypes";
const initialState = {
  deletedpayrolldetails: {
    deletedpayroll: [],
    loading: false,
  },
};
const DeletePayrollReducer = (
  state = initialState.deletedpayrolldetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_PAYROLL_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_PAYROLL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_PAYROLL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeletePayrollReducer;