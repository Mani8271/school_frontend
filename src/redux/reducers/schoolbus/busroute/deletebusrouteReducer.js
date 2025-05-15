import * as types from "../../../actions/actionTypes";
const initialState = {
  deletedbusroutedetails: {
    deletedbusroute: [],
    loading: false,
  },
};
const DeletebusrouteReducer = (
  state = initialState.deletedbusroutedetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_BUS_ROUTE_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_BUS_ROUTE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_BUS_ROUTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeletebusrouteReducer;