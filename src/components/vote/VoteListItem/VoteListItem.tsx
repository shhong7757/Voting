import React from 'react';
import {getVoteStatus} from '../../../lib/detailt';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import dayjs from 'dayjs';

interface Props {
  item: Vote;
  onPressItem: (item: Vote) => void;
}

function VoteListItem({item, onPressItem}: Props) {
  const handlePressItem = React.useCallback(() => {
    if (onPressItem) {
      onPressItem(item);
    }
  }, [item, onPressItem]);

  const {labelWrapper, label, wrapper, labelText, row, rowValue, title, table} =
    styles;
  return (
    <Pressable onPress={handlePressItem} style={wrapper}>
      {getVoteStatus(item) === 'DONE' && (
        <View style={labelWrapper}>
          <View style={label}>
            <Text style={labelText}>마감</Text>
          </View>
        </View>
      )}
      <Text style={title}>{item.title}</Text>
      <View style={table}>
        <View style={row}>
          <Text>작성자</Text>
          <View style={rowValue}>
            <Text>{item.account.name}</Text>
          </View>
        </View>
        <View style={row}>
          <Text>마감일</Text>
          <View style={rowValue}>
            <Text>{dayjs(item.deadline).format('llll')}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {backgroundColor: 'white', marginBottom: 8, padding: 16},
  labelWrapper: {marginBottom: 8},
  label: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
  },
  labelText: {color: 'white'},
  table: {marginTop: 4},
  row: {flexDirection: 'row'},
  rowValue: {marginLeft: 16},
  title: {fontWeight: 'bold', fontSize: 18},
});

export default VoteListItem;
