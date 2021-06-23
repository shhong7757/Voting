import React, {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';

function DetailScreen({children}: PropsWithChildren<{}>) {
  const {container} = styles;

  return <View style={container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', marginBottom: 8, padding: 16},
});

export default DetailScreen;
