declare module '*.jpg';
declare module '*.json';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

type MainStackParamList = {
  Home: undefined;
  Detail: {id: string; title: string};
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
  created_at: Date;
  deadline: Date;
  list: Array<string>;
  title: string;
  voter: Array<Account>;
};

type Ballot = {
  account: Account;
  value: string;
};

type Ballots = {[accountId: string]: Ballot};

type VoteDetail = {
  vote: Vote;
};
