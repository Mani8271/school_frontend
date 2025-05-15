import * as types from "../../../actions/actionTypes";
const initialState = {
  updatedbuslistdetails: {
    updatedbuslist: [],
    loading: false,
  },
};
const UpdatebuslistReducer = (
  state = initialState.updatedbuslistdetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_BUS_LIST_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_BUS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_BUS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdatebuslistReducer;