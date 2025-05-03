import * as types from "../actionTypes";
import { addstudentApi } from "../../apis/students/addstudentApi";

// Action Creators
export const createStudentStart = (formData) => ({
    type: types.ADD_STUDENT_START,
    payload: formData,
});

export const createStudentSuccess = (res) => ({
    type: types.ADD_STUDENT_SUCCESS,
    payload: res,
});

export const createStudentError = (error) => ({
    type: types.ADD_STUDENT_ERROR,
    payload: error,
});

export const AddStudentInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createStudentStart(formData));
        addstudentApi(formData)
            .then((res) => {
                dispatch(createStudentSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createStudentError(error.message));
            });
    };
};
export default {
    AddStudentInitiate,
};
