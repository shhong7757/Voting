import React from 'react';
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
  render(props: {
    show: () => void;
    hide: (callback?: () => void) => void;
  }): JSX.Element;
  children(props: {
    show: () => void;
    hide: (callback?: () => void) => void;
  }): JSX.Element;
}

const screen = Dimensions.get('screen');
const heightOfHalfScreen = screen.height / 2;
const duration = 300;

function WithBottomSheet({children, render}: Props) {
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

  const show = React.useCallback(() => {
    setVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  const hide = React.useCallback(
    (callback?: () => void) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start(() => {
        setVisible(false);

        if (callback) {
          callback();
        }
      });
    },
    [fadeAnim],
  );

  const {bh, f1, headerTitle, headerWrapper, renderContainer} = styles;

  return (
    <>
      <Modal transparent visible={visible} onRequestClose={hide}>
        <Animated.View style={[f1, {backgroundColor: fadeBackgroundColor}]}>
          <Pressable style={f1} onPress={() => hide()} />
          <Animated.View
            style={[
              renderContainer,
              {transform: [{translateY: fadeTranslateY}]},
            ]}>
            <SafeAreaView style={bh}>
              <View style={headerWrapper}>
                <View style={f1}>
                  <Text style={headerTitle}>
                    아래 유저 중 하나를 선택해주세요
                  </Text>
                </View>
                <Pressable onPress={() => hide()}>
                  <Text>취소</Text>
                </Pressable>
              </View>
              <View style={{height: heightOfHalfScreen}}>
                {render({show, hide})}
              </View>
            </SafeAreaView>
          </Animated.View>
        </Animated.View>
      </Modal>
      <View>{children({show, hide})}</View>
    </>
  );
}

const styles = StyleSheet.create({
  bh: {backgroundColor: 'white'},
  bg: {backgroundColor: 'gray'},
  f1: {flex: 1},
  headerWrapper: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  renderContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default WithBottomSheet;
