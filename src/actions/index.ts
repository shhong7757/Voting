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
