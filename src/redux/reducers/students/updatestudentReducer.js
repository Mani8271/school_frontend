import * as types from "../../actions/actionTypes";
const initialState = {
  updatedstudentdetails: {
    updatedstudent: [],
    loading: false,
  },
};
const UpdatestudentReducer = (
  state = initialState.updatedstudentdetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_STUDENTS_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_STUDENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdatestudentReducer;