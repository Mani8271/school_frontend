import * as types from "../../../actions/actionTypes";
const initialState = {
  buslistdetails: {
    buslists: [],
    loading: false,
  },
};
const AddbuslistReducer = (
  state = initialState.buslistdetails,
  action
) => {
  switch (action.type) {
    case types.ADD_BUS_LIST_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.ADD_BUS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_BUS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddbuslistReducer;