import { deletefeesApi } from "../../apis/fees/deleteFeesApi";
import * as types from "../actionTypes";


// Action Creators
export const deleteFeesStart = (formData) => ({
    type: types.DELETE_FEES_START,
    payload: formData,
});

export const deleteFeesSuccess = (res) => ({
    type: types.DELETE_FEES_SUCCESS,
    payload: res,
});

export const deleteFeesError = (error) => ({
    type: types.DELETE_FEES_ERROR,
    payload: error,
});

export const DeleteFeesInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteFeesStart(formData));
        deletefeesApi(formData)
            .then((res) => {
                dispatch(deleteFeesSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteFeesError(error.message));
            });
    };
};
export default {
    DeleteFeesInitiate,
};
