import * as types from "../../../actions/actionTypes";
const initialState = {
  updatedbusroutedetails: {
    updatedbusroute: [],
    loading: false,
  },
};
const UpdatebusrouteReducer = (
  state = initialState.updatedbusroutedetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_BUS_ROUTE_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_BUS_ROUTE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_BUS_ROUTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdatebusrouteReducer;