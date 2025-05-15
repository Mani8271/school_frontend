import { getAllbuslistApi } from "../../../apis/schoolbus/buslist/getallbuslistApi";
import * as types from "../../actionTypes";

// Action Creators
export const getAllBuslistStart = () => ({
  type: types.GET_ALL_BUS_LIST_DATA_START,
});

export const getAllBuslistSuccess = (res) => ({
  type: types.GET_ALL_BUS_LIST_DATA_SUCCESS,
  payload: res,
});

export const getAllBuslistError = (error) => ({
  type: types.GET_ALL_BUS_LIST_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllBuslistInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllBuslistStart());
    getAllbuslistApi()
      .then((res) => {
        dispatch(getAllBuslistSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllBuslistError(error.message));
      });
  };
};
export default {
  getAllBuslistInitiate,
};
