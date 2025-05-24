import * as types from "../../actions/actionTypes";
const initialState = {
  deletedfeesdetails: {
    deletedfees: [],
    loading: false,
  },
};
const DeleteFeesReducer = (
  state = initialState.deletedfeesdetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_FEES_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_FEES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_FEES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeleteFeesReducer;