import * as types from "../../actions/actionTypes";

const initialState = {
  classdetails: {
    classes: [],
    loading: false,
    error: null,
  },
};

const EditClassReducer = (state = initialState.classdetails, action) => {
  switch (action.type) {
    case types.EDIT_CLASS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.EDIT_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        // Update the class in the array
        classes: state.classes.map((classItem) =>
          classItem._id === action.payload._id ? action.payload : classItem
        ),
      };
    case types.EDIT_CLASS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EditClassReducer;
