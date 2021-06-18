import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {SUBMIT_FORM} from '../../../actions';

function FormHeaderRight() {
  const dispatch = useDispatch<AppDispatch>();

  const handlePressSubmit = React.useCallback(() => {
    dispatch({type: SUBMIT_FORM});
  }, [dispatch]);

  const {buttonWrapper} = styles;

  return (
    <View style={buttonWrapper}>
      <Pressable onPress={handlePressSubmit}>
        <Text>완료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {paddingRight: 16},
});

export default FormHeaderRight;
