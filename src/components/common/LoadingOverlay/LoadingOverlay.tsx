import React from 'react';
import {Modal, ActivityIndicator, StyleSheet, View} from 'react-native';

interface Props {
  visible: boolean;
}

function LoadingOverlay({visible}: Props) {
  const {overlay} = styles;

  return (
    <Modal transparent visible={visible}>
      <View style={overlay}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingOverlay;
