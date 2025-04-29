import * as types from "../actionTypes";
import { getprofiledataApi } from "../../apis/userprofile/getprofiledataApi";

// Action Creators
export const getuserprofileStart = () => ({
    type: types.GET_USER_PROFILE_START,
});

export const getuserprofileSuccess = (res) => ({
    type: types.GET_USER_PROFILE_SUCCESS,
    payload: res,
});

export const getuserprofileError = (error) => ({
    type: types.GET_USER_PROFILE_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
let isProfileFetched = false;

export const GetuserprofileInitiate = () => {
    return function (dispatch) {
        if (isProfileFetched) return;
        isProfileFetched = true;
        dispatch(getuserprofileStart());
        getprofiledataApi()
            .then((res) => {
                dispatch(getuserprofileSuccess(res));
                if (res.status === 200) {
                    console.log("i am response in add student intiate", res);
                }
            })
            .catch((error) => {
                dispatch(getuserprofileError(error.message));
            });
    };
};
export default {
    GetuserprofileInitiate,
};
