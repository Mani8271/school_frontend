import * as types from "../../../actions/actionTypes";
const initialState = {
  busstaffdetails: {
    busstaffs: [],
    loading: false,
  },
};
const AddbusstaffReducer = (
  state = initialState.busstaffdetails,
  action
) => {
  switch (action.type) {
    case types.ADD_BUS_STAFF_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.ADD_BUS_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_BUS_STAFF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddbusstaffReducer;