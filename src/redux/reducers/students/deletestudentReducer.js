import * as types from "../../actions/actionTypes";
const initialState = {
  deletedstudentdetails: {
    deletedstudent: [],
    loading: false,
  },
};
const DeletestudentReducer = (
  state = initialState.deletedstudentdetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_STUDENTS_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_STUDENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeletestudentReducer;