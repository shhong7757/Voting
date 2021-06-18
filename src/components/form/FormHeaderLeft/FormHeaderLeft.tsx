import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {INIT_FORM} from '../../../actions';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function FormHeaderLeft() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const handlePressSubmit = React.useCallback(() => {
    Alert.alert('작성을 취소하시겠습니까?', undefined, [
      {
        text: '예',
        onPress: () => {
          dispatch({type: INIT_FORM});
          navigation.goBack();
        },
      },
      {text: '아니요'},
    ]);
  }, [dispatch, navigation]);

  const {buttonWrapper} = styles;

  return (
    <View style={buttonWrapper}>
      <Pressable onPress={handlePressSubmit}>
        <Text>뒤로가기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {paddingLeft: 16},
});

export default FormHeaderLeft;
