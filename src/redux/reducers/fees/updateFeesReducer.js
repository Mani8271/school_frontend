import * as types from "../../actions/actionTypes";
const initialState = {
  updatedfeesdetails: {
    updatedfees: [],
    loading: false,
  },
};
const UpdatefeesReducer = (
  state = initialState.updatedfeesdetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_FEES_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_FEES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_FEES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdatefeesReducer;