import * as types from "../actionTypes";
import { deleteClassApi } from "../../apis/class/deleteClassApi";

// Action Creators
export const deleteClassStart = () => ({
  type: types.DELETE_CLASS_START,
});

export const deleteClassSuccess = (classId) => ({
  type: types.DELETE_CLASS_SUCCESS,
  payload: classId,
});

export const deleteClassError = (error) => ({
  type: types.DELETE_CLASS_ERROR,
  payload: error,
});

// Thunk Action to delete a class
export const DeleteClassInitiate = (classId) => {
  return function (dispatch) {
    dispatch(deleteClassStart());
    deleteClassApi(classId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteClassSuccess(classId));
        }
      })
      .catch((error) => {
        dispatch(deleteClassError(error.message));
      });
  };
};

export default {
  DeleteClassInitiate,
};
