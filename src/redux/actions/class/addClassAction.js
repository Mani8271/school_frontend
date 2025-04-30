import * as types from "../actionTypes";
import { addClassApi } from "../../apis/class/addClassApi";

// Action Creators
export const createClassStart = (formData) => ({
  type: types.ADD_CLASS_START,
  payload: formData,
});

export const createClassSuccess = (res) => ({
  type: types.ADD_CLASS_SUCCESS,
  payload: res,
});

export const createClassError = (error) => ({
  type: types.ADD_CLASS_ERROR,
  payload: error,
});

// Thunk Action to initiate class addition
export const AddClassInitiate = (formData) => {
  return function (dispatch) {
    dispatch(createClassStart(formData));

    addClassApi(formData)
      .then((res) => {
        dispatch(createClassSuccess(res));
        if (res.status === 200) {
          console.log("Class added successfully:", res);
        }
      })
      .catch((error) => {
        dispatch(createClassError(error.message));
      });
  };
};

export default {
  AddClassInitiate,
};
