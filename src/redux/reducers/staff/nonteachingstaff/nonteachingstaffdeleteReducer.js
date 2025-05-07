import * as types from "../../../actions/actionTypes";
const initialState = {
  deletednonteacherdetails: {
    deletednonteachingtsaff: [],
    loading: false,
  },
};
const DeletenonteacherReducer = (
  state = initialState.deletednonteacherdetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_NON_TEACHING_STAFF_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_NON_TEACHING_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_NON_TEACHING_STAFF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeletenonteacherReducer;