import * as types from "../../../actions/actionTypes";
const initialState = {
  deletedteacherdetails: {
    deletedstudent: [],
    loading: false,
  },
};
const DeleteteacherReducer = (
  state = initialState.deletedteacherdetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_TEACHING_STAFF_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_TEACHING_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_TEACHING_STAFF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeleteteacherReducer;