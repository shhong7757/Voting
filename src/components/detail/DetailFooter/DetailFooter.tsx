import React from 'react';
import {Auth} from '../../../reducers';
import {getVoteStatus} from '../../../lib/detailt';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../common/Button';

interface Props {
  auth: Auth;
  vote: Vote;
  voted: boolean;
  onPressEndVote?: () => void;
  onPressShowResult?: () => void;
  onPressVote?: () => void;
}

function DetailFooter({
  auth,
  vote,
  voted,
  onPressEndVote,
  onPressShowResult,
  onPressVote,
}: Props) {
  const hasPermission = React.useMemo(
    () => auth.account && auth.account.id === vote.account.id,
    [auth, vote],
  );

  const status = React.useMemo(() => getVoteStatus(vote), [vote]);

  const renderButtons = React.useMemo(() => {
    const {buttonText, fl1, ml16} = styles;

    switch (status) {
      case 'DONE':
        return (
          <View style={fl1}>
            <Button onPress={onPressShowResult}>
              <Text style={buttonText}>투표 결과보기</Text>
            </Button>
          </View>
        );
      case 'INPROGRESS':
        return (
          <>
            <View style={fl1}>
              {voted ? (
                <Button onPress={onPressShowResult}>
                  <Text style={buttonText}>투표 결과보기</Text>
                </Button>
              ) : (
                <Button disabled={voted} onPress={onPressVote}>
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
          </>
        );
    }
  }, [
    hasPermission,
    status,
    voted,
    onPressEndVote,
    onPressShowResult,
    onPressVote,
  ]);

  const {wrapper} = styles;

  return <View style={wrapper}>{renderButtons}</View>;
}

const styles = StyleSheet.create({
  buttonText: {color: 'white', fontWeight: 'bold'},
  fl1: {flex: 1},
  ml16: {marginLeft: 16},
  wrapper: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default DetailFooter;
