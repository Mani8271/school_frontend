import * as types from "../../../actions/actionTypes";
const initialState = {
  busroutedetails: {
    busroutes: [],
    loading: false,
  },
};
const AddbusrouteReducer = (
  state = initialState.busroutedetails,
  action
) => {
  switch (action.type) {
    case types.ADD_BUS_ROUTE_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.ADD_BUS_ROUTE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_BUS_ROUTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddbusrouteReducer;