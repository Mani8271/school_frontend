import * as types from "../../../actions/actionTypes";
const initialState = {
    updatedteacherdetails: {
    updatedteacher: [],
    loading: false,
  },
};
const UpdateteacherReducer = (
  state = initialState.updatedteacherdetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_TEACHING_STAFF_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_TEACHING_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_TEACHING_STAFF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdateteacherReducer;