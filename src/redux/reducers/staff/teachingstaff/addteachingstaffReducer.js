import * as types from "../../../actions/actionTypes";
const initialState = {
  teacherdetails: {
    students: [],
    loading: false,
  },
};
const AddteachingstaffReducer = (
  state = initialState.teacherdetails,
  action
) => {
  switch (action.type) {
    case types.ADD_TEACHING_STAFF_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.ADD_TEACHING_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_TEACHING_STAFF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddteachingstaffReducer;