import { deletebusstaffApi } from "../../../apis/schoolbus/busstaff/deletebusstaffApi";
import * as types from "../../actionTypes";


// Action Creators
export const deleteBusstaffStart = (formData) => ({
    type: types.DELETE_BUS_STAFF_START,
    payload: formData,
});

export const deleteBusstaffSuccess = (res) => ({
    type: types.DELETE_BUS_STAFF_SUCCESS,
    payload: res,
});

export const deleteBusstaffError = (error) => ({
    type: types.DELETE_BUS_STAFF_ERROR,
    payload: error,
});

export const DeleteBusstaffInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteBusstaffStart(formData));
        deletebusstaffApi(formData)
            .then((res) => {
                dispatch(deleteBusstaffSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteBusstaffError(error.message));
            });
    };
};
export default {
    DeleteBusstaffInitiate,
};
