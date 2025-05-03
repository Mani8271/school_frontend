import * as types from "../actionTypes";
import { getClassTimetableApi } from "../../apis/class/getClassTimetableApi";

// Action Creators
export const getClassTimetableStart = () => ({
  type: types.GET_CLASSTIMETABLE_START,
});

export const getClassTimetableSuccess = (data) => ({
  type: types.GET_CLASSTIMETABLE_SUCCESS,
  payload: data,
});

export const getClassTimetableError = (error) => ({
  type: types.GET_CLASSTIMETABLE_ERROR,
  payload: error,
});

// Thunk Action to initiate class timetable fetch
export const getClassTimetableInitiate = () => {
  return function (dispatch) {
    dispatch(getClassTimetableStart());

    getClassTimetableApi()
      .then((res) => {
        dispatch(getClassTimetableSuccess(res.data));
        console.log("Class timetable fetched successfully:", res.data);
      })
      .catch((error) => {
        dispatch(getClassTimetableError(error.message));
        console.error("Error fetching class timetable:", error.message);
      });
  };
};

// ❌ REMOVE this default export — it causes confusion
// export default {
//     getClassTimetableInitiate,
// };
