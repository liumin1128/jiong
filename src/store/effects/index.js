
import { takeEvery } from 'redux-saga';
import { call, put,
  select,
} from 'redux-saga/effects';
import * as readerServices from '../../services/reader.js';
import { html2json } from '../../utils/common.js';

function* getList({ payload }) {
  try {
    const params = {
      pageSize: 50,
      page: 2,
    };
    const { reader } = yield select();
    const list = reader.list;
    const data = yield call(readerServices.getList, { ...params, ...payload });
    const temp = yield html2json(data.html);
    console.log(temp);
    yield put({ type: 'reader/save', payload: { list: list.concat(temp) } });
  } catch (error) {
    console.log(error);
  }
}

function* getDetail({ payload }) {
  console.log('payload');
  console.log(payload);
  try {
    const data = yield call(readerServices.getDetail, payload);
    yield put({ type: 'reader/save', payload: { detail: data } });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}


export default function* watchEffects() {
  yield takeEvery('reader/loadmore', getList);
  yield takeEvery('reader/detail', getDetail);
}
