import {combineReducers} from 'redux';
import {
  AccountActionTypes,
  LOGOUT,
  RESTORE_ACCOUNT,
  SELECT_ACCOUNT,
} from '../actions';

function auth(state = {account: undefined}, action: AccountActionTypes) {
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

export type RootState = {
  auth: {account?: Account};
};

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
