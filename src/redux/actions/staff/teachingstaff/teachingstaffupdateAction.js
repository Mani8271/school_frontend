import * as types from "../../actionTypes";
import { updateteachingstaffApi } from "../../../apis/staff/teachingstaff/updateteachingstaffApi";

// Action Creators
export const updateTeacherStart = (formData) => ({
    type: types.UPDATE_TEACHING_STAFF_START,
    payload: formData,
});

export const updateTeacherSuccess = (res) => ({
    type: types.UPDATE_TEACHING_STAFF_SUCCESS,
    payload: res,
});

export const updateTeacherError = (error) => ({
    type: types.UPDATE_TEACHING_STAFF_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateTeacherInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updateTeacherStart(formData));
        updateteachingstaffApi(formData)
            .then((res) => {
                dispatch(updateTeacherSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateTeacherError(error.message));
            });
    };
};
export default {
    UpdateTeacherInitiate,
};
