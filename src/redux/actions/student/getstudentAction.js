import * as types from "../actionTypes";
import { getAllStudentsApi } from "../../apis/students/getstudentsApi";

// Action Creators
export const getAllStudentsStart = () => ({
  type: types.GET_ALL_STUDENTS_DATA_START,
});

export const getAllStudentsSuccess = (res) => ({
  type: types.GET_ALL_STUDENTS_DATA_SUCCESS,
  payload: res,
});

export const getAllStudentsError = (error) => ({
  type: types.GET_ALL_STUDENTS_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllStudentsInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllStudentsStart());
    getAllStudentsApi()
      .then((res) => {
        dispatch(getAllStudentsSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllStudentsError(error.message));
      });
  };
};
export default {
  getAllStudentsInitiate,
};
