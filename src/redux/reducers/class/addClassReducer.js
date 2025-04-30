import * as types from "../../actions/actionTypes";

const initialState = {
  classdetails: {
    classes: [],
    loading: false,
    error: null,
  },
};

const AddClassReducer = (state = initialState.classdetails, action) => {
  switch (action.type) {
    case types.ADD_CLASS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        // Optional: Push new class to list if needed
        // classes: [...state.classes, action.payload],
      };
    case types.ADD_CLASS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AddClassReducer;
