import * as types from "../../../actions/actionTypes";
const initialState = {
  updatedbusstaffdetails: {
    updatedbusstaff: [],
    loading: false,
  },
};
const UpdatebusstaffReducer = (
  state = initialState.updatedbusstaffdetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_BUS_STAFF_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_BUS_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_BUS_STAFF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdatebusstaffReducer;