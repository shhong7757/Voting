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
  HomeActionTypes,
  GET_LIST_FAILURE,
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
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

export type Home = {
  list: {loading: boolean; data?: Array<Vote>; error?: Error};
};

const homeInitState: Home = {
  list: {loading: false, data: undefined, error: undefined},
};

function home(state = homeInitState, action: HomeActionTypes) {
  switch (action.type) {
    case GET_LIST_FAILURE:
      return {
        ...state,
        list: {...state.list, loading: false, error: action.payload},
      };
    case GET_LIST_REQUEST:
      return {
        ...state,
        list: {...state.list, loading: true},
      };
    case GET_LIST_SUCCESS:
      return {
        ...state,
        list: {
          loading: false,
          data: action.payload,
          error: undefined,
        },
      };
    default:
      return state;
  }
}

export type RootState = {
  home: Home;
  auth: Auth;
  form: Form;
};

const rootReducer = combineReducers({
  auth,
  form,
  home,
});

export default rootReducer;
