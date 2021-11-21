import * as types from "../../config/actionType";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import action from "../../redux/App/action";
import { GET } from "../../config/api";

const BASE_URL_API =
  "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
const { setLoader } = action;

export function* getData() {
  try {
    yield put(setLoader(true));
    let response = yield call(GET, BASE_URL_API, {});

    let dataDone = response.filter((item) => item.status === 1);
    let sortDataDone = dataDone.sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
    );

    let dataNotDone = response.filter((item) => item.status === 0);
    let sortDataNotDone = dataNotDone.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
    );
    yield put({
      type: types.GET_DATA_SUCCESS,
      payload: response,
      done: sortDataDone,
      notDone: sortDataNotDone,
    });
    yield put(setLoader(false));
  } catch (error) {
    console.log("error : ", error);
    yield put(setLoader(false));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.GET_DATA, getData)]);
}
