import * as types from "../actionTypes";
import { getAllClassesApi } from "../../apis/class/getAllClassesApi";

// Action Creators
export const getAllClassesStart = () => ({
  type: types.GET_ALLCLASSES_START,
});

export const getAllClassesSuccess = (res) => ({
  type: types.GET_ALLCLASSES_SUCCESS,
  payload: res,
});

export const getAllClassesError = (error) => ({
  type: types.GET_ALLCLASSES_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
let isClassesFetched = false;

export const GetAllClassesInitiate = () => {
  return function (dispatch) {
    if (isClassesFetched) return;
    isClassesFetched = true;
    dispatch(getAllClassesStart());
    getAllClassesApi()
      .then((res) => {
        dispatch(getAllClassesSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllClassesError(error.message));
      });
  };
};

export default {
  GetAllClassesInitiate,
};
