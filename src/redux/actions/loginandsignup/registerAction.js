import * as types from "../actionTypes";
import { registerApi } from "../../apis/loginAndSignup/registerApi";

// Action Creators
export const createRegisterStart = (formData) => ({
  type: types.REGISTER_START,
  payload: formData,
});

export const createRegisterSuccess = (res) => ({
  type: types.REGISTER_SUCCESS,
  payload: res,
});

export const createRegisterError = (error) => ({
  type: types.REGISTER_ERROR,
  payload: error,
});

// Thunk Action to initiate registration
export const registerInitiate = (formData, navigate) => {
  return function (dispatch) {
    console.log("formdata",formData)
    
    dispatch(createRegisterStart(formData));

    registerApi(formData)
      .then((res) => {
        dispatch(createRegisterSuccess(res));
        if (res.status === 200) {
          const token = res?.data?.token;
          const user = res?.data?.user;
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/dashboard"); 

          if (token) {
            localStorage.setItem("token", `Bearer ${token}`);
            localStorage.setItem("user", JSON.stringify(user));
        
            navigate("/dashboard"); 
          }
        }
      })
      .catch((error) => {
        dispatch(createRegisterError(error.message));
      });
  };
};

export default {
  registerInitiate,
};
