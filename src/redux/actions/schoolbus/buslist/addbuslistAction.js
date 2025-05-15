import { addbuslistApi } from "../../../apis/schoolbus/buslist/addbuslistApi";
import * as types from "../../actionTypes";

// Action Creators
export const createBuslistStart = (formData) => ({
    type: types.ADD_BUS_LIST_START,
    payload: formData,
});

export const createBuslistSuccess = (res) => ({
    type: types.ADD_BUS_LIST_SUCCESS,
    payload: res,
});

export const createBuslistError = (error) => ({
    type: types.ADD_BUS_LIST_ERROR,
    payload: error,
});

export const AddBuslistInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createBuslistStart(formData));
        addbuslistApi(formData)
            .then((res) => {
                dispatch(createBuslistSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createBuslistError(error.message));
            });
    };
};
export default {
    AddBuslistInitiate,
};
