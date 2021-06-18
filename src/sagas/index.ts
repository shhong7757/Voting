import {FormValidationError, validateFormData} from '../lib/validation';
import {all, take, fork, select, call, put} from 'redux-saga/effects';
import {Auth, Form} from '../reducers';
import {getFormData, getAuth} from '../reducers/selectors';
import {
  INIT_FORM,
  SET_FORM_VALIDATION_ERROR,
  SET_SUBMIT_LOADING,
  SUBMIT_FORM,
} from '../actions';
import * as navigation from '../lib/rootNavigation';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';

// worker
function* submitForm() {
  try {
    const formData: Form = yield select(getFormData);
    const auth: Auth = yield select(getAuth);

    validateFormData(formData);

    const data = {
      account: auth.account,
      created_at: dayjs().toDate(),
      deadline: formData.deadline,
      list: formData.list,
      title: formData.title,
      voter: [],
    };

    yield put({type: SET_SUBMIT_LOADING, payload: true});

    const listCollectionRef = firestore().collection('list');
    yield call([listCollectionRef, listCollectionRef.add], data);

    yield put({type: SET_SUBMIT_LOADING, payload: false});
    yield put({type: INIT_FORM});

    yield call(navigation.goBack);
  } catch (e) {
    if (e instanceof FormValidationError) {
      yield put({type: SET_FORM_VALIDATION_ERROR, payload: e.properties});
    }
    yield put({type: SET_SUBMIT_LOADING, payload: false});
  }
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
