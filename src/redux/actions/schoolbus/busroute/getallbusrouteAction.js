import { getallbusrouteApi } from "../../../apis/schoolbus/busroute/getallbusrouteApi";
import * as types from "../../actionTypes";

// Action Creators
export const getAllBusrouteStart = () => ({
  type: types.GET_ALL_BUS_ROUTE_DATA_START,
});

export const getAllBusrouteSuccess = (res) => ({
  type: types.GET_ALL_BUS_ROUTE_DATA_SUCCESS,
  payload: res,
});

export const getAllBusrouteError = (error) => ({
  type: types.GET_ALL_BUS_ROUTE_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllBusrouteInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllBusrouteStart());
    getallbusrouteApi()
      .then((res) => {
        dispatch(getAllBusrouteSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllBusrouteError(error.message));
      });
  };
};
export default {
  getAllBusrouteInitiate,
};
