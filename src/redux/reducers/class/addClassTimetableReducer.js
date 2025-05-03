import * as types from "../../actions/actionTypes";

const initialState = {
  classtimetable: {
    data: null,
    loading: false,
    error: null,
  },
};

const AddClassTimetableReducer = (state = initialState.classtimetable, action) => {
  switch (action.type) {
    case types.ADD_CLASSTIMETABLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_CLASSTIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.ADD_CLASSTIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AddClassTimetableReducer;
