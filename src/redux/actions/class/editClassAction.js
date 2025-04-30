import * as types from "../actionTypes";
import { editClassApi } from "../../apis/class/editClassApi";

// Action Creators
export const editClassStart = () => ({
  type: types.EDIT_CLASS_START,
});

export const editClassSuccess = (updatedClass) => ({
  type: types.EDIT_CLASS_SUCCESS,
  payload: updatedClass,
});

export const editClassError = (error) => ({
  type: types.EDIT_CLASS_ERROR,
  payload: error,
});

// Thunk Action to edit a class
export const EditClassInitiate = (classId, classData) => {
  return function (dispatch) {
    dispatch(editClassStart());
    editClassApi(classId, classData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(editClassSuccess(res.data.Class));
        }
      })
      .catch((error) => {
        dispatch(editClassError(error.message));
      });
  };
};

export default {
  EditClassInitiate,
};
