import { updatefeesApi } from "../../apis/fees/updateFeesApi";
import * as types from "../actionTypes";

// Action Creators
export const updateFeesStart = (formData) => ({
    type: types.UPDATE_FEES_START,
    payload: formData,
});

export const updateFeesSuccess = (res) => ({
    type: types.UPDATE_FEES_SUCCESS,
    payload: res,
});

export const updateFeesError = (error) => ({
    type: types.UPDATE_FEES_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateFeesInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updateFeesStart(formData));
        updatefeesApi(formData)
            .then((res) => {
                dispatch(updateFeesSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateFeesError(error.message));
            });
    };
};
export default {
    UpdateFeesInitiate,
};
