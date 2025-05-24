
import { addpayrollApi } from "../../apis/payroll/addPayrollApi";
import * as types from "../actionTypes";

// Action Creators
export const createPayrollStart = (formData) => ({
    type: types.ADD_PAYROLL_START,
    payload: formData,
});

export const createPayrollSuccess = (res) => ({
    type: types.ADD_PAYROLL_SUCCESS,
    payload: res,
});

export const createPayrollError = (error) => ({
    type: types.ADD_PAYROLL_ERROR,
    payload: error,
});

export const AddPayrollInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createPayrollStart(formData));
        addpayrollApi(formData)
            .then((res) => {
                dispatch(createPayrollSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createPayrollError(error.message));
            });
    };
};
export default {
    AddPayrollInitiate,
};
