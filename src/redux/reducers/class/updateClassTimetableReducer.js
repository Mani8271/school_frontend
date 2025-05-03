import * as types from "../../actions/actionTypes";

const initialState = {
  timetableDetails: {
    timetables: [],
    loading: false,
    error: null,
  },
};

const UpdateClassTimetableReducer = (state = initialState.timetableDetails, action) => {
  switch (action.type) {
    case types.UPDATE_CLASSTIMETABLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPDATE_CLASSTIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetables: state.timetables.map((timetable) =>
          timetable._id === action.payload._id ? action.payload : timetable
        ),
      };

    case types.UPDATE_CLASSTIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UpdateClassTimetableReducer;
