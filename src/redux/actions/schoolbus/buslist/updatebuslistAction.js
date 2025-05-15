import { updatebuslistApi } from "../../../apis/schoolbus/buslist/updatebuslistApi";
import * as types from "../../actionTypes";

// Action Creators
export const updateBuslistStart = (formData) => ({
    type: types.UPDATE_BUS_LIST_START,
    payload: formData,
});

export const updateBuslistSuccess = (res) => ({
    type: types.UPDATE_BUS_LIST_SUCCESS,
    payload: res,
});

export const updateBuslistError = (error) => ({
    type: types.UPDATE_BUS_LIST_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateBuslistInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updateBuslistStart(formData));
        updatebuslistApi(formData)
            .then((res) => {
                dispatch(updateBuslistSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateBuslistError(error.message));
            });
    };
};
export default {
    UpdateBuslistInitiate,
};
