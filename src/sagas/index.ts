import {
  AuthValidationError,
  FormValidationError,
  validateFormData,
} from '../lib/validation';
import {all, take, fork, select, call, put} from 'redux-saga/effects';
import {Auth, Detail, Form} from '../reducers';
import {getFormData, getAuth, getDetail} from '../reducers/selectors';
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
  GET_LIST_REFRESHING,
  SET_LIST_REFRESHING,
  GET_DETAIL_REQUEST,
  GET_DETAIL_FAILURE,
  GET_DETAIL_SUCCESS,
  VOTE_REQUEST,
  SET_VOTE_PROGRESS,
  SET_VOTED,
} from '../actions';
import * as navigation from '../lib/rootNavigation';
import firestore, {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import {Alert} from 'react-native';

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
        id: doc.id,
        deadline: doc.data().deadline.toDate(),
        created_at: doc.data().created_at.toDate(),
      };
    });
    yield put({type: GET_LIST_SUCCESS, payload: list});
  } catch (e) {
    yield put({type: GET_LIST_FAILURE, payload: e});
  }
}

function* getVoteDetail(id: string) {
  try {
    const voteDetailRef = firestore().collection('list').doc(id);
    const voteDetail: FirebaseFirestoreTypes.QueryDocumentSnapshot<GetVoetListResponseData> =
      yield call([voteDetailRef, voteDetailRef.get]);

    const auth: Auth = yield select(getAuth);
    let voted = false;

    if (auth.account === undefined) {
      voted = false;
    } else {
      const ballotRef = firestore().collection('ballots').doc(id);
      const ballot: FirebaseFirestoreTypes.QueryDocumentSnapshot<Ballots> =
        yield call([ballotRef, ballotRef.get]);

      voted = ballot.data()
        ? Object.keys(ballot.data()).indexOf(auth.account.id.toString()) > -1
        : false;
    }

    yield put({type: SET_VOTED, payload: voted});
    yield put({
      type: GET_DETAIL_SUCCESS,
      payload: {
        vote: {
          ...voteDetail.data(),
          deadline: voteDetail.data().deadline.toDate(),
          created_at: voteDetail.data().created_at.toDate(),
        },
      },
    });
  } catch (e) {
    yield put({type: GET_DETAIL_FAILURE, payload: e});
  }
}

function* vote(id: string) {
  try {
    const auth: Auth = yield select(getAuth);
    const detail: Detail = yield select(getDetail);

    if (auth.account === undefined) {
      throw new AuthValidationError('account 정보가 없습니다');
    }

    yield put({type: SET_VOTE_PROGRESS, payload: true});

    const ballotListRef = firestore().collection('ballots').doc(id);

    yield call(
      [ballotListRef, ballotListRef.set],
      {
        [auth.account.id.toString()]: {
          account: auth.account,
          value: detail.selectedIdx,
        },
      },
      {
        merge: true,
      },
    );

    yield put({type: SET_VOTED, payload: true});
    yield put({type: SET_VOTE_PROGRESS, payload: false});
  } catch (e) {
    yield put({type: SET_VOTE_PROGRESS, payload: false});

    Alert.alert('투표하는데 실패했습니다', `실패사유\n${e.message}`);
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
    const action: {type: string} = yield take([
      GET_LIST_REQUEST,
      GET_LIST_REFRESHING,
    ]);
    if (action.type === GET_LIST_REFRESHING) {
      yield put({type: SET_LIST_REFRESHING, payload: true});
    }

    yield fork(getList);

    if (action.type === GET_LIST_REFRESHING) {
      yield take([GET_LIST_SUCCESS, GET_LIST_FAILURE]);
      yield put({type: SET_LIST_REFRESHING, payload: false});
    }
  }
}

function* watchGetVoteDetail() {
  while (true) {
    const {payload}: {payload: string} = yield take([GET_DETAIL_REQUEST]);
    yield fork(getVoteDetail, payload);
  }
}

function* watchVote() {
  while (true) {
    const {payload} = yield take(VOTE_REQUEST);
    yield fork(vote, payload);
  }
}

export default function* root() {
  yield all([
    fork(watchSubmitForm),
    fork(watchGetList),
    fork(watchGetVoteDetail),
    fork(watchVote),
  ]);
}
