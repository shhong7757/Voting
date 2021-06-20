import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../common/Button';

interface Props {
  onPressCreate?: () => void;
}

function VoteListItem({onPressCreate}: Props) {
  const {container, text, buttonText, buttonWrapper} = styles;

  return (
    <View style={container}>
      <Text style={text}>
        {'진행중인 투표가 없습니다 \n 첫번째 투표를 생성해보세요!'}
      </Text>
      <View style={buttonWrapper}>
        <Button onPress={onPressCreate}>
          <Text style={buttonText}>투표 생성하러 가기</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {textAlign: 'center'},
  buttonWrapper: {marginTop: 16},
  buttonText: {color: 'white'},
});

export default VoteListItem;
