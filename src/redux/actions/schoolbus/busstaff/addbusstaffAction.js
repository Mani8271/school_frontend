import { addbusstaffApi } from "../../../apis/schoolbus/busstaff/addbusstaffApi";
import * as types from "../../actionTypes";

// Action Creators
export const createBusstaffStart = (formData) => ({
    type: types.ADD_BUS_STAFF_START,
    payload: formData,
});

export const createBusstaffSuccess = (res) => ({
    type: types.ADD_BUS_STAFF_SUCCESS,
    payload: res,
});

export const createBusstaffError = (error) => ({
    type: types.ADD_BUS_STAFF_ERROR,
    payload: error,
});

export const AddBusstaffInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createBusstaffStart(formData));
        addbusstaffApi(formData)
            .then((res) => {
                dispatch(createBusstaffSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createBusstaffError(error.message));
            });
    };
};
export default {
    AddBusstaffInitiate,
};
