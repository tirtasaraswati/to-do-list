import * as types from "../../config/actionType";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import action from "../../redux/App/action";
import { GET } from "../../config/api";

const BASE_URL_API =
  "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
const { setLoader } = action;
const getState = (state) => state.App;

export function* getData() {
  try {
    yield put(setLoader(true));
    const state = yield select(getState);

    let response = yield call(GET, BASE_URL_API, {});

    yield put({
      type: types.GET_DATA_SUCCESS,
      payload: response,
    });
    yield put(setLoader(false));
  } catch (error) {
    console.log("error : ", error);
    yield put(setLoader(false));
  }
}

export function* getDetail(action) {
  try {
    yield put(setLoader(true));
  } catch (error) {
    console.log("error : ", error);
    yield put(setLoader(false));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.GET_DATA, getData),
    takeLatest(types.GET_DETAIL, getDetail),
  ]);
}