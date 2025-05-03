import * as types from "../actionTypes";
import { updateClassTimetableApi } from "../../apis/class/updateClassTimetableApi";

// Action Creators
export const updateClassTimetableStart = () => ({
  type: types.UPDATE_CLASSTIMETABLE_START,
});

export const updateClassTimetableSuccess = (updatedTimetable) => ({
  type: types.UPDATE_CLASSTIMETABLE_SUCCESS,
  payload: updatedTimetable,
});

export const updateClassTimetableError = (error) => ({
  type: types.UPDATE_CLASSTIMETABLE_ERROR,
  payload: error,
});

// Thunk Action to update a class timetable
export const UpdateClassTimetableInitiate = (timetableId, timetableData) => {
  return function (dispatch) {
    dispatch(updateClassTimetableStart());
    updateClassTimetableApi(timetableId, timetableData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateClassTimetableSuccess(res.data.updatedTimetable));
        }
      })
      .catch((error) => {
        dispatch(updateClassTimetableError(error.message));
      });
  };
};

export default {
  UpdateClassTimetableInitiate,
};
