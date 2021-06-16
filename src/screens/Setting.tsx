import React from 'react';
import Button from '../components/common/Button';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../constant';
import {LOGOUT} from '../actions';

function SettingScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const handlePressLogout = React.useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY.ACCOUNT);
    dispatch({type: LOGOUT});
  }, [dispatch]);

  const {container, text} = styles;

  return (
    <View style={container}>
      <Button onPress={handlePressLogout}>
        <Text style={text}>로그아웃</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16},
  text: {color: 'white', fontWeight: 'bold'},
});

export default SettingScreen;
