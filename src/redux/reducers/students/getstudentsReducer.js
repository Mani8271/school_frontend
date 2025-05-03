import * as types from "../../actions/actionTypes";

const initialState = {
  allstudents: {
    students: [],  // Array to store classes
    loading: false,  // State to track loading
    error: null,  // State to track errors
  },
};

const GetAllStudentsReducer = (state = initialState.allstudents, action) => {
  switch (action.type) {
    case types.GET_ALL_STUDENTS_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,  // Reset error when request starts
      };
    case types.GET_ALL_STUDENTS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,  // Store fetched classes
      };
    case types.GET_ALL_STUDENTS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,  // Store any error message
      };
    default:
      return state;
  }
};

export default GetAllStudentsReducer;
