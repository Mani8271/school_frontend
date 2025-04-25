import * as types from "../actionTypes";
import { forgotPasswordApi } from "../../apis/loginAndSignup/forgotPasswordApi"; // You need to create this API function

// Action Creators
export const forgotPasswordStart = (email) => ({
  type: types.FORGOT_PASSWORD_START,
  payload: email,
});

export const forgotPasswordSuccess = (res) => ({
  type: types.FORGOT_PASSWORD_SUCCESS,
  payload: res,
});

export const forgotPasswordError = (error) => ({
  type: types.FORGOT_PASSWORD_ERROR,
  payload: error,
});

// Thunk Action
export const forgotPasswordInitiate = (formData, navigate) => {
  console.log("formData to send:", formData);
  return function (dispatch) {
    dispatch(forgotPasswordStart(formData));


    forgotPasswordApi( formData )
      .then((res) => {
        dispatch(forgotPasswordSuccess(res));
        if (res.status === 200) {

       navigate("/login"); // Redirect to login page on success
        }
      })
      .catch((error) => {
        dispatch(forgotPasswordError(error.message));
      });
  };
};

export default {
  forgotPasswordInitiate,
};
