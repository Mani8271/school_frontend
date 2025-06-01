import { addfessApi } from "../../apis/fees/addFeesApi";
import * as types from "../actionTypes";

// Action Creators
export const createFeesStart = (formData) => ({
    type: types.ADD_FEES_START,
    payload: formData,
});

export const createFeesSuccess = (res) => ({
    type: types.ADD_FEES_SUCCESS,
    payload: res,
});

export const createFeesError = (error) => ({
    type: types.ADD_FEES_ERROR,
    payload: error,
});

export const AddFeesInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createFeesStart(formData));
        addfessApi(formData)
            .then((res) => {
                dispatch(createFeesSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createFeesError(error.message));
            });
    };
};
export default {
    AddFeesInitiate,
};
