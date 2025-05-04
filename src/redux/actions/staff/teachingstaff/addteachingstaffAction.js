import * as types from "../../actionTypes";
import { addteachingstaffApi } from "../../../apis/staff/teachingstaff/addteachingstaffApi";

// Action Creators
export const createTeachingstaffStart = (formData) => ({
    type: types.ADD_TEACHING_STAFF_START,
    payload: formData,
});

export const createTeachingstaffSuccess = (res) => ({
    type: types.ADD_TEACHING_STAFF_SUCCESS,
    payload: res,
});

export const createTeachingstaffError = (error) => ({
    type: types.ADD_TEACHING_STAFF_ERROR,
    payload: error,
});

export const AddTeachingstaffInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createTeachingstaffStart(formData));
        addteachingstaffApi(formData)
            .then((res) => {
                dispatch(createTeachingstaffSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createTeachingstaffError(error.message));
            });
    };
};
export default {
    AddTeachingstaffInitiate,
};
