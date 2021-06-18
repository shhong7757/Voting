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
