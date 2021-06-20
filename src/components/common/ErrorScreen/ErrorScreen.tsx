import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../Button';

interface Props {
  error: Error;
  text?: string;
  showErrorMessage?: boolean;
  showRetryButton?: boolean;
  onPressRetry?: () => void;
}

function ErrorScreen({
  error,
  text = '에러가 발생했습니다!',
  showErrorMessage = true,
  showRetryButton = true,
  onPressRetry,
}: Props) {
  const {
    container,
    title,
    buttonText,
    buttonWrapper,
    errorBlock,
    errorWrapper,
    errorMessage,
  } = styles;

  return (
    <View style={container}>
      <Text style={title}>{text}</Text>
      {showErrorMessage && (
        <View style={errorWrapper}>
          <View style={errorBlock}>
            <Text>message : </Text>
            <Text style={errorMessage}>{error.message}</Text>
          </View>
        </View>
      )}
      {showRetryButton && (
        <View style={buttonWrapper}>
          <Button onPress={onPressRetry}>
            <Text style={buttonText}>재시도</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  title: {textAlign: 'center'},
  buttonWrapper: {marginTop: 64},
  buttonText: {color: 'white'},
  errorWrapper: {
    marginTop: 16,
    marginHorizontal: 32,
  },
  errorBlock: {
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    padding: 16,

    flexWrap: 'wrap',
  },
  errorMessage: {color: 'red'},
});

export default ErrorScreen;
