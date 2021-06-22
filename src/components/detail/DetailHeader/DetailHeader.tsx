import React from 'react';
import {Detail} from '../../../reducers';
import {View, Text} from 'react-native';
import AccountProfile from '../../account/AccountProfile';

import dayjs from 'dayjs';
import {StyleSheet} from 'react-native';

interface Props {
  detail: Detail;
}

function DetailHeader({detail}: Props) {
  const [account, created_at, deadline] = React.useMemo(() => {
    if (detail.vote.data) {
      return [
        detail.vote.data.vote.account,
        detail.vote.data.vote.created_at,
        detail.vote.data.vote.deadline,
      ];
    }

    return [{id: -1, name: 'undefined'}, undefined, undefined];
  }, [detail]);

  const {creator, creatorText, dateKey, dateTableContainer, dateTableRow} =
    styles;

  return (
    <>
      <View style={creator}>
        <Text style={creatorText}>생성자</Text>
      </View>
      <AccountProfile account={account} />
      <View style={dateTableContainer}>
        <View style={dateTableRow}>
          <Text style={dateKey}>생성일 : </Text>
          <Text>{dayjs(created_at).format('llll')}</Text>
        </View>
        <View style={dateTableRow}>
          <Text style={dateKey}>마감일 : </Text>
          <Text>{dayjs(deadline).format('llll')}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  creator: {marginBottom: 8},
  creatorText: {fontSize: 16, fontWeight: 'bold'},
  dateTableContainer: {marginTop: 8},
  dateTableRow: {flexDirection: 'row'},
  dateKey: {fontWeight: 'bold'},
});

export default DetailHeader;
