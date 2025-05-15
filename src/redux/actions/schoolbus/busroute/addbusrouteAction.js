import { addbusrouteApi } from "../../../apis/schoolbus/busroute/addbusrouteApi";
import * as types from "../../actionTypes";

// Action Creators
export const createBusrouteStart = (formData) => ({
    type: types.ADD_BUS_ROUTE_START,
    payload: formData,
});

export const createBusrouteSuccess = (res) => ({
    type: types.ADD_BUS_ROUTE_SUCCESS,
    payload: res,
});

export const createBusrouteError = (error) => ({
    type: types.ADD_BUS_ROUTE_ERROR,
    payload: error,
});

export const AddBusrouteInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createBusrouteStart(formData));
        addbusrouteApi(formData)
            .then((res) => {
                dispatch(createBusrouteSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createBusrouteError(error.message));
            });
    };
};
export default {
    AddBusrouteInitiate,
};
