import * as types from "../../actionTypes";
import { getAllTeachingApi } from "../../../apis/staff/teachingstaff/getteachingstaffApi";

// Action Creators
export const getAllTeachersStart = () => ({
  type: types.GET_ALL_TEACHING_STAFF_DATA_START,
});

export const getAllTeachersSuccess = (res) => ({
  type: types.GET_ALL_TEACHING_STAFF_DATA_SUCCESS,
  payload: res,
});

export const getAllTeachersError = (error) => ({
  type: types.GET_ALL_TEACHING_STAFF_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllTeachersInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllTeachersStart());
    getAllTeachingApi()
      .then((res) => {
        dispatch(getAllTeachersSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllTeachersError(error.message));
      });
  };
};
export default {
  getAllTeachersInitiate,
};
