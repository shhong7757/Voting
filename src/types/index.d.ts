declare module '*.jpg';
declare module '*.json';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

type MainStackParamList = {
  Home: undefined;
  Create: undefined;
  Detail: undefined;
};

type MyStackParamList = {
  Setting: undefined;
  Account: undefined;
};

type TabParamsList = {
  Main: undefined;
  My: undefined;
};

type Account = {
  id: number;
  name: string;
};

type Vote = {
  id: string;
  account: Account;
  created_at: Date;
  deadline: Date;
  list: Array<string>;
  title: string;
  voter: Array<Account>;
};
