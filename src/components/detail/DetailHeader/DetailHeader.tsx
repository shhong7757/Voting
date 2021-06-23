import React from 'react';
import {Auth} from '../../../reducers';
import {View, Text, Pressable, Alert} from 'react-native';
import AccountProfile from '../../account/AccountProfile';

import dayjs from 'dayjs';
import {StyleSheet} from 'react-native';

interface Props {
  auth: Auth;
  vote: Vote;
  onPressDelete?: () => void;
}

function DetailHeader({auth, vote, onPressDelete}: Props) {
  const handlePressDelete = React.useCallback(() => {
    if (onPressDelete) {
      Alert.alert('정말 삭제하시겠습니까?', undefined, [
        {text: '예', onPress: onPressDelete},
        {text: '아니오'},
      ]);
    }
  }, [onPressDelete]);

  const hasPermission = React.useMemo(
    () => auth.account && auth.account.id === vote.account.id,
    [auth, vote],
  );

  const {
    creator,
    creatorText,
    dateKey,
    dateTableContainer,
    dateTableRow,
    fl1,
    remove,
  } = styles;

  return (
    <>
      <View style={creator}>
        <View style={fl1}>
          <Text style={creatorText}>생성자</Text>
        </View>
        {hasPermission && (
          <Pressable onPress={handlePressDelete}>
            <Text style={remove}>삭제하기</Text>
          </Pressable>
        )}
      </View>
      <AccountProfile account={vote.account} />
      <View style={dateTableContainer}>
        <View style={dateTableRow}>
          <Text style={dateKey}>생성일 : </Text>
          <Text>{dayjs(vote.startDate).format('llll')}</Text>
        </View>
        <View style={dateTableRow}>
          <Text style={dateKey}>마감일 : </Text>
          <Text>{dayjs(vote.deadline).format('llll')}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  creator: {marginBottom: 8, flexDirection: 'row', alignItems: 'center'},
  creatorText: {fontSize: 16, fontWeight: 'bold'},
  dateTableContainer: {marginTop: 8},
  dateTableRow: {flexDirection: 'row'},
  dateKey: {fontWeight: 'bold'},
  fl1: {flex: 1},
  remove: {color: 'red'},
});

export default DetailHeader;
