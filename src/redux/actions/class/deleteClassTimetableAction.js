import * as types from "../actionTypes";
import { deleteClassTimetableApi } from "../../apis/class/deleteClassTimetableApi";

// Action Creators
export const deleteClassTimetableStart = () => ({
  type: types.DELETE_CLASSTIMETABLE_START,
});

export const deleteClassTimetableSuccess = (timetableId) => ({
  type: types.DELETE_CLASSTIMETABLE_SUCCESS,
  payload: timetableId,
});

export const deleteClassTimetableError = (error) => ({
  type: types.DELETE_CLASSTIMETABLE_ERROR,
  payload: error,
});

// Thunk Action to delete a class timetable
export const deleteClassTimetableInitiate = (timetableId) => {
  return function (dispatch) {
    dispatch(deleteClassTimetableStart());
    deleteClassTimetableApi(timetableId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteClassTimetableSuccess(timetableId));
        }
      })
      .catch((error) => {
        dispatch(deleteClassTimetableError(error.message));
      });
  };
};


