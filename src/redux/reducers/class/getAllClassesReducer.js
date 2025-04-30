import * as types from "../../actions/actionTypes";

const initialState = {
  classdetails: {
    classes: [],  // Array to store classes
    loading: false,  // State to track loading
    error: null,  // State to track errors
  },
};

const GetAllClassesReducer = (state = initialState.classdetails, action) => {
  switch (action.type) {
    case types.GET_ALLCLASSES_START:
      return {
        ...state,
        loading: true,
        error: null,  // Reset error when request starts
      };
    case types.GET_ALLCLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        classes: action.payload,  // Store fetched classes
      };
    case types.GET_ALLCLASSES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,  // Store any error message
      };
    default:
      return state;
  }
};

export default GetAllClassesReducer;
