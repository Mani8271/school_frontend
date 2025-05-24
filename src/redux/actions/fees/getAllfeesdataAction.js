import { getAllfeesApi } from "../../apis/fees/getAllfeesdataApi";
import * as types from "../actionTypes";

// Action Creators
export const getAllFeesStart = () => ({
  type: types.GET_ALL_FEES_DATA_START,
});

export const getAllFeesSuccess = (res) => ({
  type: types.GET_ALL_FEES_DATA_SUCCESS,
  payload: res,
});

export const getAllFeesError = (error) => ({
  type: types.GET_ALL_FEES_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllFeesInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllFeesStart());
    getAllfeesApi()
      .then((res) => {
        dispatch(getAllFeesSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllFeesError(error.message));
      });
  };
};
export default {
  getAllFeesInitiate,
};
