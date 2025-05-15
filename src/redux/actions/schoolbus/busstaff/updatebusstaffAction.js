import { updatebusstaffApi } from "../../../apis/schoolbus/busstaff/updatebusstaffApi";
import * as types from "../../actionTypes";

// Action Creators
export const updateBusstaffStart = (formData) => ({
    type: types.UPDATE_BUS_STAFF_START,
    payload: formData,
});

export const updateBusstaffSuccess = (res) => ({
    type: types.UPDATE_BUS_STAFF_SUCCESS,
    payload: res,
});

export const updateBusstaffError = (error) => ({
    type: types.UPDATE_BUS_STAFF_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateBusstaffInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updateBusstaffStart(formData));
        updatebusstaffApi(formData)
            .then((res) => {
                dispatch(updateBusstaffSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateBusstaffError(error.message));
            });
    };
};
export default {
    UpdateBusstaffInitiate,
};
