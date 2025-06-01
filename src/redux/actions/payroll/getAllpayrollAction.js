import { getAllpayrollApi } from "../../apis/payroll/getAllpayrollApi";
import * as types from "../actionTypes";

// Action Creators
export const getAllPayrollStart = () => ({
  type: types.GET_ALL_PAYROLL_DATA_START,
});

export const getAllPayrollSuccess = (res) => ({
  type: types.GET_ALL_PAYROLL_DATA_SUCCESS,
  payload: res,
});

export const getAllPayrollError = (error) => ({
  type: types.GET_ALL_PAYROLL_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllPayrollInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllPayrollStart());
    getAllpayrollApi()
      .then((res) => {
        dispatch(getAllPayrollSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllPayrollError(error.message));
      });
  };
};
export default {
  getAllPayrollInitiate,
};
