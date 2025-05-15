import { updatebusrouteApi } from "../../../apis/schoolbus/busroute/updatebusrouteApi";
import * as types from "../../actionTypes";

// Action Creators
export const updateBusrouteStart = (formData) => ({
    type: types.UPDATE_BUS_ROUTE_START,
    payload: formData,
});

export const updateBusrouteSuccess = (res) => ({
    type: types.UPDATE_BUS_ROUTE_SUCCESS,
    payload: res,
});

export const updateBusrouteError = (error) => ({
    type: types.UPDATE_BUS_ROUTE_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateBusrouteInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updateBusrouteStart(formData));
        updatebusrouteApi(formData)
            .then((res) => {
                dispatch(updateBusrouteSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateBusrouteError(error.message));
            });
    };
};
export default {
    UpdateBusrouteInitiate,
};
