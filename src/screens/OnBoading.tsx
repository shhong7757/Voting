import React from 'react';
import Button from '../components/common/Button';
import WithBottomSheet from '../components/common/WithBottomSheet';
import AccountProfile from '../components/account/AccountProfile';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import {AppDispatch} from '../store';
import {STORAGE_KEY} from '../constant';
import {useDispatch} from 'react-redux';

import accountData from '../mock/account.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OnBoadingScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const handlePressAccount = React.useCallback(
    (account: Account) => {
      async function login() {
        await AsyncStorage.setItem(
          STORAGE_KEY.ACCOUNT,
          JSON.stringify(account),
        );
        dispatch({type: 'SELECT_ACCOUNT', payload: account});
      }

      login();
    },
    [dispatch],
  );

  const {accountWrapper, accountListWrapper, container, buttonText} = styles;

  return (
    <WithBottomSheet
      render={({hide}) => (
        <FlatList
          style={accountListWrapper}
          data={accountData}
          renderItem={({item}) => (
            <Pressable
              style={accountWrapper}
              onPress={() => hide(() => handlePressAccount(item))}>
              <AccountProfile account={item} />
            </Pressable>
          )}
        />
      )}>
      {({show}) => (
        <SafeAreaView style={container}>
          <View>
            <Button onPress={show}>
              <Text style={buttonText}>시작하기</Text>
            </Button>
          </View>
        </SafeAreaView>
      )}
    </WithBottomSheet>
  );
}

const styles = StyleSheet.create({
  accountWrapper: {
    paddingVertical: 8,
  },
  accountListWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  container: {
    margin: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OnBoadingScreen;
