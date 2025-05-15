import { getallbusstaffApi } from "../../../apis/schoolbus/busstaff/getallbusstaffApi";
import * as types from "../../actionTypes";

// Action Creators
export const getAllBusstaffStart = () => ({
  type: types.GET_ALL_BUS_STAFF_DATA_START,
});

export const getAllBusstaffSuccess = (res) => ({
  type: types.GET_ALL_BUS_STAFF_DATA_SUCCESS,
  payload: res,
});

export const getAllBusstaffError = (error) => ({
  type: types.GET_ALL_BUS_STAFF_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllBusstaffInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllBusstaffStart());
    getallbusstaffApi()
      .then((res) => {
        dispatch(getAllBusstaffSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllBusstaffError(error.message));
      });
  };
};
export default {
  getAllBusstaffInitiate,
};
