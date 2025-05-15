import { deletenonteachingstaffApi } from "../../../apis/staff/nonteachingsatff/deletenonteachingstaffApi";
import * as types from "../../actionTypes";


// Action Creators
export const deleteNonteacherStart = (formData) => ({
    type: types.DELETE_NON_TEACHING_STAFF_START,
    payload: formData,
});

export const deleteNonteacherSuccess = (res) => ({
    type: types.DELETE_NON_TEACHING_STAFF_SUCCESS,
    payload: res,
});

export const deleteNonteacherError = (error) => ({
    type: types.DELETE_NON_TEACHING_STAFF_ERROR,
    payload: error,
});

export const DeleteNonteacherInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteNonteacherStart(formData));
        deletenonteachingstaffApi(formData)
            .then((res) => {
                dispatch(deleteNonteacherSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteNonteacherError(error.message));
            });
    };
};
export default {
    DeleteNonteacherInitiate,
};
