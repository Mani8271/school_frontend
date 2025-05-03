import { updatestudentApi } from "../../apis/students/updatestudentApi";
import * as types from "../actionTypes";

// Action Creators
export const updateStudentStart = (formData) => ({
    type: types.UPDATE_STUDENTS_START,
    payload: formData,
});

export const updateStudentSuccess = (res) => ({
    type: types.UPDATE_STUDENTS_SUCCESS,
    payload: res,
});

export const updateStudentError = (error) => ({
    type: types.UPDATE_STUDENTS_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateStudentInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updateStudentStart(formData));
        updatestudentApi(formData)
            .then((res) => {
                dispatch(updateStudentSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateStudentError(error.message));
            });
    };
};
export default {
    UpdateStudentInitiate,
};
