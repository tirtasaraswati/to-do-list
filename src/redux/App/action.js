import * as types from "../../config/actionType";

export const setLoader = (isLoading) => {
  return {
    type: types.SET_LOADER,
    isLoading,
  };
};

export const getData = () => {
  return {
    type: types.GET_DATA,
  };
};

export const handleState = (field, value) => {
  return {
    type: types.HANDLE_STATE,
    field,
    value,
  };
};

export const handleStateData = (field, value, main) => {
  return {
    type: types.HANDLE_STATE_DATA,
    field,
    value,
    main,
  };
};

export const clearForm = (value) => {
  return {
    type: types.CLEAR_DATA_DETAIL,
    value,
  };
};

const allFunctionApp = {
  setLoader,
  getData,
  handleState,
  handleStateData,
  clearForm,
};

export default allFunctionApp;
