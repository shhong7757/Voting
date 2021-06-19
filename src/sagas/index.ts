import {FormValidationError, validateFormData} from '../lib/validation';
import {all, take, fork, select, call, put} from 'redux-saga/effects';
import {Auth, Form} from '../reducers';
import {getFormData, getAuth} from '../reducers/selectors';
import {
  GetVoteListRequestPayload,
  GetVoetListResponseData,
  GET_LIST_FAILURE,
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  INIT_FORM,
  SET_FORM_VALIDATION_ERROR,
  SET_SUBMIT_LOADING,
  SUBMIT_FORM,
} from '../actions';
import * as navigation from '../lib/rootNavigation';
import firestore, {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import dayjs from 'dayjs';

// worker
function* submitForm() {
  try {
    const formData: Form = yield select(getFormData);
    const auth: Auth = yield select(getAuth);

    validateFormData(formData);

    const data: GetVoteListRequestPayload & {
      created_at: FirebaseFirestoreTypes.Timestamp;
      deadline: FirebaseFirestoreTypes.Timestamp;
    } = {
      account: auth.account || {id: -1, name: 'undefined'},
      created_at: firebase.firestore.Timestamp.fromDate(dayjs().toDate()),
      deadline: firebase.firestore.Timestamp.fromDate(formData.deadline),
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

    yield put({type: GET_LIST_REQUEST});
  } catch (e) {
    if (e instanceof FormValidationError) {
      yield put({type: SET_FORM_VALIDATION_ERROR, payload: e.properties});
    }
    yield put({type: SET_SUBMIT_LOADING, payload: false});
  }
}

function* getList() {
  try {
    const listCollectionRef = firestore().collection('list');
    const listSnapshot: FirebaseFirestoreTypes.QuerySnapshot<GetVoetListResponseData> =
      yield call([listCollectionRef, listCollectionRef.get]);

    const list = listSnapshot.docs.map(function (doc): Vote {
      return {
        ...doc.data(),
        deadline: doc.data().deadline.toDate(),
        created_at: doc.data().created_at.toDate(),
      };
    });
    yield put({type: GET_LIST_SUCCESS, payload: list});
  } catch (e) {
    yield put({type: GET_LIST_FAILURE, payload: e});
  }
}

// watcher
function* watchSubmitForm() {
  while (true) {
    yield take(SUBMIT_FORM);
    yield fork(submitForm);
  }
}

function* watchGetList() {
  while (true) {
    yield take(GET_LIST_REQUEST);
    yield fork(getList);
  }
}

export default function* root() {
  yield all([fork(watchSubmitForm), fork(watchGetList)]);
}
