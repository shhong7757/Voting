import React from 'react';
import {Auth, Detail} from '../../../reducers';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../common/Button';

interface Props {
  auth: Auth;
  detail: Detail;
  onPressEndVote?: () => void;
  onPressShowResult?: () => void;
  onPressVote?: () => void;
}

function DetailFooter({
  auth,
  detail,
  onPressEndVote,
  onPressShowResult,
  onPressVote,
}: Props) {
  const hasPermission = React.useMemo(
    () =>
      detail.vote.data &&
      auth.account &&
      auth.account.id === detail.vote.data.vote.account.id,
    [auth, detail],
  );

  const {buttonText, container, fl1, ml16, wrapper} = styles;

  return (
    <View style={container}>
      <View style={wrapper}>
        <View style={fl1}>
          {detail.voted ? (
            <Button onPress={onPressShowResult}>
              <Text style={buttonText}>투표 결과보기</Text>
            </Button>
          ) : (
            <Button disabled={detail.voted} onPress={onPressVote}>
              <Text style={buttonText}>투표하기</Text>
            </Button>
          )}
        </View>
        {hasPermission && (
          <View style={[fl1, ml16]}>
            <Button onPress={onPressEndVote}>
              <Text style={buttonText}>투표 종료하기</Text>
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {color: 'white', fontWeight: 'bold'},
  container: {padding: 16, backgroundColor: 'white'},
  fl1: {flex: 1},
  ml16: {marginLeft: 16},
  wrapper: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default DetailFooter;
