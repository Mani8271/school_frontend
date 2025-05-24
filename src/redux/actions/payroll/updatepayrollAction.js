import { updatepayrollApi } from "../../apis/payroll/updatePayrollApi";
import * as types from "../actionTypes";

// Action Creators
export const updatePayrollStart = (formData) => ({
    type: types.UPDATE_PAYROLL_START,
    payload: formData,
});

export const updatePayrollSuccess = (res) => ({
    type: types.UPDATE_PAYROLL_SUCCESS,
    payload: res,
});

export const updatePayrollError = (error) => ({
    type: types.UPDATE_PAYROLL_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdatePayrollInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updatePayrollStart(formData));
        updatepayrollApi(formData)
            .then((res) => {
                dispatch(updatePayrollSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updatePayrollError(error.message));
            });
    };
};
export default {
    UpdatePayrollInitiate,
};
