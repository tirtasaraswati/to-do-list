import * as types from "./../../config/actionType";

const initState = {
  isLoading: false,
  listData: [],
  dataDetail: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.SET_LOADER:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.GET_DATA_SUCCESS:
      return {
        ...state,
        listData: action.payload,
      };
    case types.HANDLE_STATE:
      return {
        ...state,
        search: {
          ...state.search,
          [action.field]: action.value,
        },
      };
    case types.GET_DETAIL_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload,
      };
    case types.CLEAR_DATA_DETAIL:
      return {
        ...state,
        dataDetail: {},
      };
    default:
      return state;
  }
};
