import * as types from "./../../config/actionType";
import moment from "moment";

const initState = {
  isLoading: false,
  isModalVisible: false,
  listData: [],
  listDataDone: [],
  listDataNotDone: [],
  statusData: [
    {
      label: "Done",
      value: 1,
    },
    {
      label: "Not Done",
      value: 0,
    },
  ],
  form: {
    id: 0,
    title: "",
    description: "",
    status: "",
    createdAt: moment(),
  },
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
        listDataDone: action.done,
        listDataNotDone: action.notDone,
      };
    case types.HANDLE_STATE:
      return {
        ...state,
        [action.field]: action.value,
      };
    case types.HANDLE_STATE_DATA:
      return {
        ...state,
        [action.main]: { ...state[action.main], [action.field]: action.value },
      };
    case types.CLEAR_DATA_DETAIL:
      return {
        ...state,
        form: {
          ...state.form,
          id: 0,
          title: "",
          description: "",
          status: "",
          createdAt: moment(),
        },
      };
    default:
      return state;
  }
};
