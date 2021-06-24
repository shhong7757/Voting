import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function LoadingScreen() {
  const {container} = styles;

  return (
    <View style={container}>
      <ActivityIndicator size="small" color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
