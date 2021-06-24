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

  const {
    accountWrapper,
    accountListWrapper,
    container,
    buttonText,
    onBoadingText,
    onBoadingTextWrapper,
  } = styles;

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
          <View style={onBoadingTextWrapper}>
            <Text style={onBoadingText}>
              {
                '이 앱은 클래스팅 과제를 위해 작성된 앱입니다. \n 아래 시작하기 버튼을 누르면 계정을 선택할 수 있습니다.'
              }
            </Text>
          </View>
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
    flex: 1,
    margin: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  onBoadingTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onBoadingText: {textAlign: 'center'},
});

export default OnBoadingScreen;
