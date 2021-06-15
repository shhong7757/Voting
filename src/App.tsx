import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import HomeScreen from './screens/Home';
import CreateScreen from './screens/Create';
import DetailScreen from './screens/Detail';
import MyScreen from './screens/My';
import store from './store';
import AccountsScreen from './screens/Accounts';

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
      <MyStack.Screen name="My" component={MyScreen} />
      <MyStack.Screen name="Accounts" component={AccountsScreen} />
    </MyStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Main" component={MainStacNavigator} />
          <Tab.Screen name="My" component={MyStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
