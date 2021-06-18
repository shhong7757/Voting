import dayjs from 'dayjs';
import {combineReducers} from 'redux';
import {
  AccountActionTypes,
  LOGOUT,
  RESTORE_ACCOUNT,
  SELECT_ACCOUNT,
  FormActionTypes,
  SET_FORM_DEADLINE,
  SET_FORM_TITLE,
  SET_FORM_VOTE_LIST,
  INIT_FORM,
  SET_SUBMIT_LOADING,
  SET_FORM_VALIDATION_ERROR,
} from '../actions';

export type Auth = {account?: Account};
const authInitState = {account: undefined};
function auth(state = authInitState, action: AccountActionTypes) {
  switch (action.type) {
    case LOGOUT:
      return {account: undefined};
    case SELECT_ACCOUNT:
      return {account: action.payload};
    case RESTORE_ACCOUNT:
      return {account: action.payload};
    default:
      return state;
  }
}

export type Form = {
  title: string;
  deadline: Date;
  list: Array<string>;
  loading: boolean;
  validationError: Array<keyof Omit<Form, 'loading' | 'validationError'>>;
};

const dayOffset = 3;
const limitOfList = 3;
const formInitState: Form = {
  deadline: dayjs().add(dayOffset, 'd').minute(0).toDate(),
  list: new Array<string>(limitOfList).fill(''),
  loading: false,
  title: '',
  validationError: [],
};

function form(state = formInitState, action: FormActionTypes) {
  switch (action.type) {
    case INIT_FORM:
      return formInitState;
    case SET_FORM_DEADLINE:
      return {...state, deadline: action.payload};
    case SET_FORM_VALIDATION_ERROR:
      return {...state, validationError: action.payload};
    case SET_FORM_TITLE:
      return {...state, title: action.payload};
    case SET_FORM_VOTE_LIST:
      return {...state, list: action.payload};
    case SET_SUBMIT_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}

export type RootState = {
  auth: Auth;
  form: Form;
};

const rootReducer = combineReducers({
  auth,
  form,
});

export default rootReducer;
