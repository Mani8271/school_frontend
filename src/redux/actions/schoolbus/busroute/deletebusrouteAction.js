import { deletebusrouteApi } from "../../../apis/schoolbus/busroute/deletebusrouteApi";
import * as types from "../../actionTypes";


// Action Creators
export const deleteBusrouteStart = (formData) => ({
    type: types.DELETE_BUS_ROUTE_START,
    payload: formData,
});

export const deleteBusrouteSuccess = (res) => ({
    type: types.DELETE_BUS_ROUTE_SUCCESS,
    payload: res,
});

export const deleteBusrouteError = (error) => ({
    type: types.DELETE_BUS_ROUTE_ERROR,
    payload: error,
});

export const DeleteBusrouteInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteBusrouteStart(formData));
        deletebusrouteApi(formData)
            .then((res) => {
                dispatch(deleteBusrouteSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteBusrouteError(error.message));
            });
    };
};
export default {
    DeleteBusrouteInitiate,
};
