import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

//
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT' as const;
export const RESTORE_ACCOUNT = 'RESTORE_ACCOUNT' as const;
export const LOGOUT = 'LOGOUT' as const;

export const selectAccount = (account: Account) => ({
  type: SELECT_ACCOUNT,
  payload: account,
});

export const restoreAccount = (account: Account) => ({
  type: RESTORE_ACCOUNT,
  payload: account,
});

export const logout = () => ({type: LOGOUT});

export type AccountActionTypes =
  | ReturnType<typeof logout>
  | ReturnType<typeof selectAccount>
  | ReturnType<typeof restoreAccount>;

//
export const INIT_FORM = 'INIT_FORM' as const;
export const SET_FORM_DEADLINE = 'SET_FORM_DEADLINE' as const;
export const SET_FORM_TITLE = 'SET_FORM_TITLE' as const;
export const SET_FORM_VALIDATION_ERROR = 'SET_FORM_VALIDATION_ERROR' as const;
export const SET_FORM_VOTE_LIST = 'SET_FORM_VOTE_LIST' as const;
export const SET_SUBMIT_LOADING = 'SET_SUBMIT_LOADING' as const;
export const SUBMIT_FORM = 'SUBMIT_FORM' as const;

export const initForm = () => ({type: INIT_FORM});

export const setFormDeadLine = (date: Date) => ({
  type: SET_FORM_DEADLINE,
  payload: date,
});

export const setFormTitle = (title: string) => ({
  type: SET_FORM_TITLE,
  payload: title,
});

export const setFormValidationError = (validationError: Array<string>) => ({
  type: SET_FORM_VALIDATION_ERROR,
  payload: validationError,
});

export const setFormVoteList = (list: Array<string>) => ({
  type: SET_FORM_VOTE_LIST,
  payload: list,
});

export const setSubmitLoading = (loading: boolean) => ({
  type: SET_SUBMIT_LOADING,
  payload: loading,
});

export const submitForm = () => ({type: SUBMIT_FORM});

export type FormActionTypes =
  | ReturnType<typeof initForm>
  | ReturnType<typeof setFormDeadLine>
  | ReturnType<typeof setFormTitle>
  | ReturnType<typeof setFormValidationError>
  | ReturnType<typeof setFormVoteList>
  | ReturnType<typeof submitForm>
  | ReturnType<typeof setSubmitLoading>;

//
export const GET_LIST_REFRESHING = 'GET_LIST_REFRESHING' as const;
export const GET_LIST_REQUEST = 'GET_LIST_REQUEST' as const;
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS' as const;
export const GET_LIST_FAILURE = 'GET_LIST_FAILURE' as const;
export const SET_LIST_REFRESHING = 'SET_LIST_REFRESHING' as const;

export const getListRefreshing = () => ({type: GET_LIST_REFRESHING});

export const getListRequest = () => ({type: GET_LIST_REQUEST});

export const getListSuccess = (list: Array<Vote>) => ({
  type: GET_LIST_SUCCESS,
  payload: list,
});

export const getListFailure = (error: Error) => ({
  type: GET_LIST_FAILURE,
  payload: error,
});

export const setListRefreshing = (refreshing: boolean) => ({
  type: SET_LIST_REFRESHING,
  payload: refreshing,
});

export type GetVoteListRequestPayload = Omit<
  Merge<
    Vote,
    {
      created_at: FirebaseFirestoreTypes.Timestamp;
      deadline: FirebaseFirestoreTypes.Timestamp;
    }
  >,
  'id'
>;

export type GetVoetListResponseData = Merge<
  Vote,
  {
    created_at: FirebaseFirestoreTypes.Timestamp;
    deadline: FirebaseFirestoreTypes.Timestamp;
  }
>;

export type HomeActionTypes =
  | ReturnType<typeof getListRefreshing>
  | ReturnType<typeof getListFailure>
  | ReturnType<typeof getListRequest>
  | ReturnType<typeof getListSuccess>
  | ReturnType<typeof setListRefreshing>;

//
export const GET_DETAIL_FAILURE = 'GET_DETAIL_FAILURE' as const;
export const GET_DETAIL_REQUEST = 'GET_DETAIL_REQUEST' as const;
export const GET_DETAIL_SUCCESS = 'GET_DETAIL_SUCCESS' as const;
export const SET_DETAIL_SELECTED_IDX = 'SET_DETAIL_SELECTED_IDX' as const;
export const SET_VOTE_ACTIVATE = 'SET_VOTE_ACTIVATE' as const;
export const SET_VOTE_PROGRESS = 'SET_VOTE_PROGRESS' as const;
export const SET_VOTED = 'SET_VOTED' as const;
export const VOTE_REQUEST = 'VOTE_REQUEST' as const;

export const getDetailRequest = (id: string) => ({
  type: GET_DETAIL_REQUEST,
  payload: id,
});

export const getDetailSuccess = (detail: VoteDetail) => ({
  type: GET_DETAIL_SUCCESS,
  payload: detail,
});

export const getDetailFailure = (error: Error) => ({
  type: GET_DETAIL_FAILURE,
  payload: error,
});

export const voteRequest = () => ({
  type: VOTE_REQUEST,
});

export const setDetailSelectedIdx = (idx: number) => ({
  type: SET_DETAIL_SELECTED_IDX,
  payload: idx,
});

export const setVoted = (voted: boolean) => ({
  type: SET_VOTED,
  payload: voted,
});

export const setVoteActivate = (id: string) => ({
  type: SET_VOTE_ACTIVATE,
  payload: id,
});

export const setVoteProgress = (progress: boolean) => ({
  type: SET_VOTE_PROGRESS,
  payload: progress,
});

export type DetailActionTypes =
  | ReturnType<typeof getDetailFailure>
  | ReturnType<typeof getDetailRequest>
  | ReturnType<typeof getDetailSuccess>
  | ReturnType<typeof setDetailSelectedIdx>
  | ReturnType<typeof setVoted>
  | ReturnType<typeof setVoteActivate>
  | ReturnType<typeof setVoteProgress>
  | ReturnType<typeof voteRequest>;
