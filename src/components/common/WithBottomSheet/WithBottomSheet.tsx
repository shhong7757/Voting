import React, {ReactChild} from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  View,
  Animated,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';

interface Props {
  render: ReactChild;
  children(props: {show: () => void}): JSX.Element;
}

const screen = Dimensions.get('screen');
const heightOfHalfScreen = screen.height / 2;
const duration = 300;

function AAA({children, render}: Props) {
  const [visible, setVisible] = React.useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeBackgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)'],
  });
  const fadeTranslateY = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [heightOfHalfScreen, 0],
  });

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim, visible]);

  const show = React.useCallback(() => {
    setVisible(true);
  }, []);

  const hide = React.useCallback(() => setVisible(false), []);

  const {bh, f1, renderContainer} = styles;

  return (
    <>
      <Modal transparent visible={visible} onRequestClose={hide}>
        <Animated.View style={[f1, {backgroundColor: fadeBackgroundColor}]}>
          <View style={f1} />
          <Animated.View
            style={[
              renderContainer,
              {transform: [{translateY: fadeTranslateY}]},
            ]}>
            <SafeAreaView style={bh}>
              <Pressable onPress={hide}>
                <Text>종료</Text>
              </Pressable>
              <View style={{height: heightOfHalfScreen}}>{render}</View>
            </SafeAreaView>
          </Animated.View>
        </Animated.View>
      </Modal>
      <View>{children({show})}</View>
    </>
  );
}

const styles = StyleSheet.create({
  bh: {backgroundColor: 'white'},
  bg: {backgroundColor: 'gray'},
  f1: {flex: 1},
  renderContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default AAA;
