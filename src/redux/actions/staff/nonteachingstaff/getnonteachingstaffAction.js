import { getAllnonTeachingApi } from "../../../apis/staff/nonteachingsatff/getnonteachingstaffApi";
import * as types from "../../actionTypes";

// Action Creators
export const getAllnonTeachersStart = () => ({
  type: types.GET_ALL_NON_TEACHING_STAFF_DATA_START,
});

export const getAllnonTeachersSuccess = (res) => ({
  type: types.GET_ALL_NON_TEACHING_STAFF_DATA_SUCCESS,
  payload: res,
});

export const getAllnonTeachersError = (error) => ({
  type: types.GET_ALL_NON_TEACHING_STAFF_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllnonTeachersInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllnonTeachersStart());
    getAllnonTeachingApi()
      .then((res) => {
        dispatch(getAllnonTeachersSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllnonTeachersError(error.message));
      });
  };
};
export default {
  getAllnonTeachersInitiate,
};
