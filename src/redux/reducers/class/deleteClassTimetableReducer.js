import * as types from "../../actions/actionTypes";

const initialState = {
  classtimetableDetails: {
    classtimetables: [],
    loading: false,
    error: null,
  },
};

const DeleteClassTimetableReducer = (state = initialState.classtimetableDetails, action) => {
  switch (action.type) {
    case types.DELETE_CLASSTIMETABLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_CLASSTIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        // Remove the deleted class timetable by ID
        classtimetables: state.classtimetables.filter(
          timetable => timetable._id !== action.payload._id
        ),
      };
    case types.DELETE_CLASSTIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DeleteClassTimetableReducer;
