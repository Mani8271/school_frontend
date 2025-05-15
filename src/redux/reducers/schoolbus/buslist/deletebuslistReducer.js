import * as types from "../../../actions/actionTypes";
const initialState = {
  deletedbuslistdetails: {
    deletedbuslist: [],
    loading: false,
  },
};
const DeletebuslistReducer = (
  state = initialState.deletedbuslistdetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_BUS_LIST_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_BUS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_BUS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeletebuslistReducer;