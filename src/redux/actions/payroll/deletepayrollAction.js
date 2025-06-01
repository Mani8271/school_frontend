import { deletepayrollApi } from "../../apis/payroll/deletePayrollApi";
import * as types from "../actionTypes";


// Action Creators
export const deletePayrollStart = (formData) => ({
    type: types.DELETE_PAYROLL_START,
    payload: formData,
});

export const deletePayrollSuccess = (res) => ({
    type: types.DELETE_PAYROLL_SUCCESS,
    payload: res,
});

export const deletePayrollError = (error) => ({
    type: types.DELETE_PAYROLL_ERROR,
    payload: error,
});

export const DeletePayrollInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deletePayrollStart(formData));
        deletepayrollApi(formData)
            .then((res) => {
                dispatch(deletePayrollSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deletePayrollError(error.message));
            });
    };
};
export default {
    DeletePayrollInitiate,
};
