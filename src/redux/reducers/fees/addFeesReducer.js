import * as types from "../../actions/actionTypes";
const initialState = {
  fessdetails: {
    fesss: [],
    loading: false,
  },
};
const AddFessReducer = (
  state = initialState.fessdetails,
  action
) => {
  switch (action.type) {
    case types.ADD_FEES_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.ADD_FEES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_FEES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddFessReducer;