import * as types from "../../../actions/actionTypes";
const initialState = {
    updatednonteacherdetails: {
    updatedteacher: [],
    loading: false,
  },
};
const UpdatenonteacherReducer = (
  state = initialState.updatednonteacherdetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_NON_TEACHING_STAFF_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_NON_TEACHING_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_NON_TEACHING_STAFF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdatenonteacherReducer;