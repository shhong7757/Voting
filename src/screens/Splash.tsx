import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

function SplashScreen() {
  const {body} = styles;
  return (
    <View style={body}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default SplashScreen;
