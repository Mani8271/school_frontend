import { updatenonteachingstaffApi } from "../../../apis/staff/nonteachingsatff/updatenonteachingstaffApi";
import * as types from "../../actionTypes";

// Action Creators
export const updateNonteacherStart = (formData) => ({
    type: types.UPDATE_NON_TEACHING_STAFF_START,
    payload: formData,
});

export const updateNonteacherSuccess = (res) => ({
    type: types.UPDATE_NON_TEACHING_STAFF_SUCCESS,
    payload: res,
});

export const updateNonteacherError = (error) => ({
    type: types.UPDATE_NON_TEACHING_STAFF_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateNonteacherInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updateNonteacherStart(formData));
        updatenonteachingstaffApi(formData)
            .then((res) => {
                dispatch(updateNonteacherSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateNonteacherError(error.message));
            });
    };
};
export default {
    UpdateNonteacherInitiate,
};
