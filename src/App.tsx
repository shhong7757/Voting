import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {RESTORE_ACCOUNT} from './actions';
import {STORAGE_KEY} from './constant';
import AccountScreen from './screens/Account';
import AccountsScreen from './screens/Accounts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateScreen from './screens/Create';
import DetailScreen from './screens/Detail';
import HomeScreen from './screens/Home';
import SplashScreen from './screens/Splash';
import OnBoadingScreen from './screens/OnBoading';
import store, {AppDispatch} from './store';
import {RootState} from './reducers';
import {Alert} from 'react-native';

const AuthFlowStack = createStackNavigator();
const MainStack = createStackNavigator<MainStackParamList>();
const MyStack = createStackNavigator<MyStackParamList>();
const Tab = createBottomTabNavigator<TabParamsList>();

const MainStacNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Create" component={CreateScreen} />
      <MainStack.Screen name="Detail" component={DetailScreen} />
    </MainStack.Navigator>
  );
};

const MyStackNavigator = () => {
  return (
    <MyStack.Navigator>
      <MyStack.Screen name="Account" component={AccountScreen} />
      <MyStack.Screen name="Accounts" component={AccountsScreen} />
    </MyStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainStacNavigator} />
      <Tab.Screen name="My" component={MyStackNavigator} />
    </Tab.Navigator>
  );
};

const AuthFlow = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  const dispatch = useDispatch<AppDispatch>();

  const account = useSelector((state: RootState) => state.auth.account);

  React.useEffect(() => {
    if (error) {
      Alert.alert('저장된 데이터를 읽어오는데 실패했습니다');
    }
  }, [error]);

  React.useCallback(async () => {
    try {
      const savedAccount = await AsyncStorage.getItem(STORAGE_KEY.ACCOUNT);

      if (savedAccount) {
        const parsedData = JSON.parse(savedAccount) as Account;
        dispatch({type: RESTORE_ACCOUNT, payload: parsedData});
      }

      setLoading(false);
    } catch (e) {
      // read error
      setError(e);
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthFlowStack.Navigator headerMode="none">
      {account !== undefined ? (
        <>
          <AuthFlowStack.Screen name="Root" component={TabNavigator} />
        </>
      ) : (
        <>
          <AuthFlowStack.Screen name="OnBoading" component={OnBoadingScreen} />
        </>
      )}
    </AuthFlowStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthFlow />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
