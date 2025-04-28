import * as types from "../actionTypes";
import { createEmailLoginApi } from "../../apis/loginandsignup/emailLoginApi";

// Action Creators
export const createEmailLoginStart = (formData) => ({
  type: types.EMAIL_LOGIN_START,
  payload: formData,
});

export const createEmailLoginSuccess = (res) => ({
  type: types.EMAIL_LOGIN_SUCCESS,
  payload: res,
});

export const createEmailLoginError = (error) => ({
  type: types.EMAIL_LOGIN_ERROR,
  payload: error,
});


export const LoginwithemailInitiate = (formData, navigate) => {
  return function (dispatch) {
    const payload = { ...formData };
    dispatch(createEmailLoginStart(payload));

    createEmailLoginApi(payload)
      .then((res) => {
        dispatch(createEmailLoginSuccess(res));
        if (res.status === 200) {
          console.log("Navigating to")
          const token = res?.data?.token; 
          const user =res?.data?.user;
          console.log("user12",res?.data)
          if (token) {
            
            localStorage.setItem("token", `Bearer ${token}`);
            console.log("user",user)
            localStorage.setItem("user",JSON.stringify(user))
             console.log("uu",localStorage.getItem("user"))
            console.log("token",token)
            navigate('/dashboard');
          }
        }
      })
      .catch((error) => {
        dispatch(createEmailLoginError(error.message));
      });
  };
};

export default {    
    LoginwithemailInitiate
};
