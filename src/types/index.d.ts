declare module '*.jpg';
declare module '*.json';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

type MainStackParamList = {
  Home: undefined;
  Detail: {id: string; title: string};
  Result: {id: string};
};

type MyStackParamList = {
  Setting: undefined;
  Account: undefined;
};

type TabParamsList = {
  Main: undefined;
  My: undefined;
  CreateTmp: undefined;
};

type Account = {
  id: number;
  name: string;
};

type Vote = {
  id: string;
  account: Account;
  activate: boolean;
  created_at: Date;
  deadline: Date;
  list: Array<string>;
  startDate: Date;
  title: string;
};

type VoteStatus = 'DONE' | 'INPROGRESS' | 'NONE';

type Ballot = {
  account: Account;
  value: string;
};

type Ballots = {[accountId: string]: Ballot};
