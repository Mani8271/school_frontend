import * as types from "../../actionTypes";
import { deleteteachingstaffApi } from "../../../apis/staff/teachingstaff/deleteteachingstaffApi";


// Action Creators
export const deleteTeacherStart = (formData) => ({
    type: types.DELETE_TEACHING_STAFF_START,
    payload: formData,
});

export const deleteTeacherSuccess = (res) => ({
    type: types.DELETE_TEACHING_STAFF_SUCCESS,
    payload: res,
});

export const deleteTeacherError = (error) => ({
    type: types.DELETE_TEACHING_STAFF_ERROR,
    payload: error,
});

export const DeleteTeacherInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteTeacherStart(formData));
        deleteteachingstaffApi(formData)
            .then((res) => {
                dispatch(deleteTeacherSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteTeacherError(error.message));
            });
    };
};
export default {
    DeleteTeacherInitiate,
};
