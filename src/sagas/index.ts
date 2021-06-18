import {all, take, fork, call, put} from 'redux-saga/effects';
import {SET_SUBMIT_LOADING, SUBMIT_FORM} from '../actions';
import * as navigation from '../lib/rootNavigation';

// worker
function* submitForm() {
  yield put({type: SET_SUBMIT_LOADING, payload: true});

  yield put({type: SET_SUBMIT_LOADING, payload: false});

  yield call(navigation.goBack);
}

// watcher
function* watchSubmitForm() {
  while (true) {
    yield take(SUBMIT_FORM);
    yield fork(submitForm);
  }
}

export default function* root() {
  yield all([fork(watchSubmitForm)]);
}
