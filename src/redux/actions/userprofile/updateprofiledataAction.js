import { updateprofiledataApi } from "../../apis/userprofile/updateprofiledataApi";
import * as types from "../actionTypes";

// Action Creators
export const updateprofiledataStart = (formData) => ({
    type: types.UPDATE_USER_PROFILE_START,
    payload: formData,
});

export const updateprofiledataSuccess = (res) => ({
    type: types.UPDATE_USER_PROFILE_SUCCESS,
    payload: res,
});

export const updateprofiledataError = (error) => ({
    type: types.UPDATE_USER_PROFILE_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateprofiledataInitiate = (formData) => {
    console.log("----->",formData)
    return function (dispatch) {
        

        dispatch(updateprofiledataStart(formData));

        updateprofiledataApi(formData)
            .then((res) => {
                dispatch(updateprofiledataSuccess(res));
                if (res.status === 200) {

                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateprofiledataError(error.message));
            });
    };
};

export default {
    UpdateprofiledataInitiate,
};
