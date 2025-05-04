import * as types from "../actionTypes";
import { addHolidayApi } from "../../apis/holiday/addHolidayApi";

// Action Creators
export const addHolidayStart = (formData) => ({
  type: types.ADD_HOLIDAY_START,
  payload: formData,
});

export const addHolidaySuccess = (res) => ({
  type: types.ADD_HOLIDAY_SUCCESS,
  payload: res,
});

export const addHolidayError = (error) => ({
  type: types.ADD_HOLIDAY_ERROR,
  payload: error,
});

// Thunk Action to initiate holiday addition
export const AddHolidayInitiate = (formData) => {
  return function (dispatch) {
    dispatch(addHolidayStart(formData));

    addHolidayApi(formData)
      .then((res) => {
        dispatch(addHolidaySuccess(res));
        if (res.status === 200) {
          console.log("Holiday added successfully:", res);
        }
      })
      .catch((error) => {
        dispatch(addHolidayError(error.message));
      });
  };
};

export default {
  AddHolidayInitiate,
};
