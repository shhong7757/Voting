import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Pressable, Text, StyleSheet} from 'react-native';
import {primaryColor} from '../../../constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {SvgType} from '../../common/Svg/Svg';

function RootBottomTab({state, descriptors, navigation}: BottomTabBarProps) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const {wrapper, tab, fontColor, fontPirmaryColor} = styles;

  return (
    <SafeAreaView style={wrapper} edges={['right', 'bottom', 'left']}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'CreateTmp') {
              navigation.navigate('Create');
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        let svg: SvgType | undefined;

        switch (route.name) {
          case 'CreateTmp':
            svg = 'Add';
            break;
          case 'Main':
            svg = 'List';
            break;
          case 'My':
            svg = 'User';
            break;
          default:
            break;
        }

        return (
          <Pressable
            key={`root-bottom-tab-${route.key}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={tab}>
            <Svg svg={svg} fill={isFocused ? primaryColor : 'black'} />
            <Text style={isFocused ? fontPirmaryColor : fontColor}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  tab: {flex: 1, alignItems: 'center'},
  fontColor: {color: '#222'},
  fontPirmaryColor: {color: primaryColor},
});

export default RootBottomTab;
