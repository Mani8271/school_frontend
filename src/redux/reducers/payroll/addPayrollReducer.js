import * as types from "../../actions/actionTypes";
const initialState = {
  payrolldetails: {
    payroll: [],
    loading: false,
  },
};
const AddPayrollReducer = (
  state = initialState.payrolldetails,
  action
) => {
  switch (action.type) {
    case types.ADD_PAYROLL_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.ADD_PAYROLL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_PAYROLL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddPayrollReducer;