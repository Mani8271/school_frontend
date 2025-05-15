import { addnonteachingstaffApi } from "../../../apis/staff/nonteachingsatff/addnonteachingstaffApi";
import * as types from "../../actionTypes";

// Action Creators
export const createNonteachingstaffStart = (formData) => ({
    type: types.ADD_NON_TEACHING_STAFF_START,
    payload: formData,
});

export const createNonteachingstaffSuccess = (res) => ({
    type: types.ADD_NON_TEACHING_STAFF_SUCCESS,
    payload: res,
});

export const createNonteachingstaffError = (error) => ({
    type: types.ADD_NON_TEACHING_STAFF_ERROR,
    payload: error,
});

export const AddNonteachingstaffInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createNonteachingstaffStart(formData));
        addnonteachingstaffApi(formData)
            .then((res) => {
                dispatch(createNonteachingstaffSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createNonteachingstaffError(error.message));
            });
    };
};
export default {
    AddNonteachingstaffInitiate,
};
