import * as types from "../../actions/actionTypes";

const initialState = {
  holidays: [],
  loading: false,
  error: null,
};

const AddHolidayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_HOLIDAY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_HOLIDAY_SUCCESS:
      return {
        ...state,
        loading: false,
        // Optional: Push new holiday to list if needed
        // holidays: [...state.holidays, action.payload],
      };
    case types.ADD_HOLIDAY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AddHolidayReducer;
