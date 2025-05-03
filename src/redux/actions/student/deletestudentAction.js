import { deletestudentApi } from "../../apis/students/deletestudentApi";
import { updatestudentApi } from "../../apis/students/updatestudentApi";
import * as types from "../actionTypes";


// Action Creators
export const deleteStudentStart = (formData) => ({
    type: types.DELETE_STUDENTS_START,
    payload: formData,
});

export const deleteStudentSuccess = (res) => ({
    type: types.DELETE_STUDENTS_SUCCESS,
    payload: res,
});

export const deleteStudentError = (error) => ({
    type: types.DELETE_STUDENTS_ERROR,
    payload: error,
});

export const DeleteStudentInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteStudentStart(formData));
        deletestudentApi(formData)
            .then((res) => {
                dispatch(deleteStudentSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteStudentError(error.message));
            });
    };
};
export default {
    DeleteStudentInitiate,
};
