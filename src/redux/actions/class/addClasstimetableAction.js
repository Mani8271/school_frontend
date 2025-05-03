import * as types from "../actionTypes";
import { addClassTimetableApi } from "../../apis/class/addClassTimetableApi";

// Action Creators
export const createClassTimetableStart = (formData) => ({
  type: types.ADD_CLASSTIMETABLE_START,
  payload: formData,
});

export const createClassTimetableSuccess = (res) => ({
  type: types.ADD_CLASSTIMETABLE_SUCCESS,
  payload: res,
});

export const createClassTimetableError = (error) => ({
  type: types.ADD_CLASSTIMETABLE_ERROR,
  payload: error,
});

// Thunk Action to initiate class timetable addition
export const AddClassTimetableInitiate = (formData) => {
  return function (dispatch) {
    dispatch(createClassTimetableStart(formData));

    addClassTimetableApi(formData)
      .then((res) => {
        dispatch(createClassTimetableSuccess(res));
        if (res.status === 200) {
          console.log("Class timetable added successfully:", res);
        }
      })
      .catch((error) => {
        dispatch(createClassTimetableError(error.message));
      });
  };
};

export default {
  AddClassTimetableInitiate,
};
