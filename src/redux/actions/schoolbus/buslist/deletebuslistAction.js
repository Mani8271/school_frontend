import { deletebuslistApi } from "../../../apis/schoolbus/buslist/deletebuslistApi";
import * as types from "../../actionTypes";


// Action Creators
export const deleteBuslistStart = (formData) => ({
    type: types.DELETE_BUS_LIST_START,
    payload: formData,
});

export const deleteBuslistSuccess = (res) => ({
    type: types.DELETE_BUS_LIST_SUCCESS,
    payload: res,
});

export const deleteBuslistError = (error) => ({
    type: types.DELETE_BUS_LIST_ERROR,
    payload: error,
});

export const DeleteBuslistInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteBuslistStart(formData));
        deletebuslistApi(formData)
            .then((res) => {
                dispatch(deleteBuslistSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteBuslistError(error.message));
            });
    };
};
export default {
    DeleteBuslistInitiate,
};
