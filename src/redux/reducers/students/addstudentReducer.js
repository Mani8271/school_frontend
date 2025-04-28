import * as types from "../../actions/actionTypes";
const initialState = {
  studentdetails: {
    students: [],
    loading: false,
  },
};
const AddstudentReducer = (
  state = initialState.studentdetails,
  action
) => {
  switch (action.type) {
    case types.ADD_STUDENT_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_STUDENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddstudentReducer;