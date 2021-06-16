declare module '*.jpg';
declare module '*.json';

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
