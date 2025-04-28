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

// Thunk Action to initiate registration
export const AddStudentInitiate = (formData) => {
    return function (dispatch) {
        

        dispatch(createStudentStart(formData));

        addstudentApi(formData)
            .then((res) => {
                dispatch(createStudentSuccess(res));
                if (res.status === 200) {

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
