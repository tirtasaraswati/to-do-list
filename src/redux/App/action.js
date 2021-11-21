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

export const getDetail = (value) => {
  return {
    type: types.GET_DETAIL,
    value,
  };
};

export const handleState = (field, value) => {
  return {
    type: types.HANDLE_STATE,
    field,
    value,
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
  getDetail,
  handleState,
  clearForm,
};

export default allFunctionApp;
