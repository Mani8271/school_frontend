import * as types from "../../../actions/actionTypes";

const initialState = {
  allbusstaff: {
    busstaff: [],  // Array to store classes
    loading: false,  // State to track loading
    error: null,  // State to track errors
  },
};

const GetAllBusstaffReducer = (state = initialState.allbusstaff, action) => {
  switch (action.type) {
    case types.GET_ALL_BUS_STAFF_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,  // Reset error when request starts
      };
    case types.GET_ALL_BUS_STAFF_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        busstaff: action.payload,  // Store fetched classes
      };
    case types.GET_ALL_BUS_STAFF_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,  // Store any error message
      };
    default:
      return state;
  }
};

export default GetAllBusstaffReducer;
