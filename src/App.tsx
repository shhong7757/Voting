import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {RESTORE_ACCOUNT} from './actions';
import {STORAGE_KEY} from './constant';
import AccountScreen from './screens/Account';
import SettingScreen from './screens/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateScreen from './screens/Create';
import DetailScreen from './screens/Detail';
import HomeScreen from './screens/Home';
import SplashScreen from './screens/Splash';
import OnBoadingScreen from './screens/OnBoading';
import store, {AppDispatch} from './store';
import {RootState} from './reducers';
import {Alert, View} from 'react-native';
import FormHeaderRight from './components/form/FormHeaderRight';
import {navigationRef} from './lib/rootNavigation';
import FormHeaderLeft from './components/form/FormHeaderLeft';
import RootBottomTab from './components/bottomTab/RootBottomTab/RootBottomTab';
import ResultScreen from './screens/Result';

const AuthFlowStack = createStackNavigator();
const MainStack = createStackNavigator<MainStackParamList>();
const MyStack = createStackNavigator<MyStackParamList>();
const Tab = createBottomTabNavigator<TabParamsList>();

const MainStacNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Detail" component={DetailScreen} />
      <MainStack.Screen name="Result" component={ResultScreen} />
    </MainStack.Navigator>
  );
};

const MyStackNavigator = () => {
  return (
    <MyStack.Navigator>
      <MyStack.Screen name="Account" component={AccountScreen} />
    </MyStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <RootBottomTab {...props} />}>
      <Tab.Screen name="Main" component={MainStacNavigator} />
      <Tab.Screen name="CreateTmp" component={View} />
      <Tab.Screen name="My" component={MyStackNavigator} />
    </Tab.Navigator>
  );
};

const AuthFlow = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(undefined);

  const dispatch = useDispatch<AppDispatch>();

  const account = useSelector((state: RootState) => state.auth.account);

  React.useEffect(() => {
    if (error) {
      Alert.alert('저장된 데이터를 읽어오는데 실패했습니다');
    }
  }, [error]);

  React.useEffect(() => {
    async function load() {
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
    }

    load();
  }, [dispatch]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthFlowStack.Navigator>
      {account !== undefined ? (
        <>
          <AuthFlowStack.Screen
            name="Root"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <AuthFlowStack.Screen
            name="Setting"
            component={SettingScreen}
            options={{headerShown: true}}
          />
          <AuthFlowStack.Screen
            name="Create"
            component={CreateScreen}
            options={{
              headerRight: () => <FormHeaderRight />,
              headerLeft: () => <FormHeaderLeft />,
              gestureEnabled: false,
            }}
          />
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
      <NavigationContainer ref={navigationRef}>
        <AuthFlow />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
