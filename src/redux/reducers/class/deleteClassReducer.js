import * as types from "../../actions/actionTypes";

const initialState = {
  classdetails: {
    classes: [],
    loading: false,
    error: null,
  },
};

const DeleteClassReducer = (state = initialState.classdetails, action) => {
  switch (action.type) {
    case types.DELETE_CLASS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        // Remove the deleted class from the list
        classes: state.classes.filter(classItem => classItem._id !== action.payload._id),
      };
    case types.DELETE_CLASS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DeleteClassReducer;
