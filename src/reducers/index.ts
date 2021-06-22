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
  SET_LIST_REFRESHING,
  DetailActionTypes,
  GET_DETAIL_REQUEST,
  GET_DETAIL_SUCCESS,
  GET_DETAIL_FAILURE,
  SET_DETAIL_SELECTED_IDX,
  SET_VOTED,
  SET_VOTE_PROGRESS,
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
  list: {
    loading: boolean;
    data?: Array<Vote>;
    error?: Error;
    refreshing: boolean;
  };
};

const homeInitState: Home = {
  list: {loading: false, data: undefined, error: undefined, refreshing: false},
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
          ...state.list,
          loading: false,
          data: action.payload,
          error: undefined,
        },
      };
    case SET_LIST_REFRESHING:
      return {
        ...state,
        list: {...state.list, refreshing: action.payload},
      };
    default:
      return state;
  }
}

export type Detail = {
  selectedIdx: number;
  vote: {loading: boolean; data?: VoteDetail; error?: Error};
  voted: boolean;
  voteProgress: boolean;
};

const detailInitState: Detail = {
  selectedIdx: -1,
  vote: {loading: false, data: undefined, error: undefined},
  voteProgress: false,
  voted: false,
};

function detail(state = detailInitState, action: DetailActionTypes) {
  switch (action.type) {
    case GET_DETAIL_REQUEST:
      return {...state, vote: {...state.vote, loading: true}};
    case GET_DETAIL_SUCCESS: {
      return {
        ...state,
        vote: {data: action.payload, loading: false, error: undefined},
      };
    }
    case GET_DETAIL_FAILURE: {
      return {
        ...state,
        vote: {...state.vote, loading: false, error: action.payload},
      };
    }
    case SET_DETAIL_SELECTED_IDX: {
      return {...state, selectedIdx: action.payload};
    }
    case SET_VOTE_PROGRESS: {
      return {...state, voteProgress: action.payload};
    }
    case SET_VOTED: {
      return {...state, voted: action.payload};
    }
    default:
      return state;
  }
}

export type RootState = {
  home: Home;
  auth: Auth;
  form: Form;
  detail: Detail;
};

const rootReducer = combineReducers({
  auth,
  form,
  home,
  detail,
});

export default rootReducer;
