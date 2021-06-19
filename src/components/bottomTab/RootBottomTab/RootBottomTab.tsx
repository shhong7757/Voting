import React from 'react';
import {Pressable, Text, SafeAreaView, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {primaryColor} from '../../../constant';

function RootBottomTab({state, descriptors, navigation}: BottomTabBarProps) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const {wrapper, tab, fontColor, fontPirmaryColor} = styles;

  return (
    <SafeAreaView style={wrapper}>
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

        return (
          <Pressable
            key={`root-bottom-tab-${route.key}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={tab}>
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
  wrapper: {flexDirection: 'row', backgroundColor: 'white'},
  tab: {flex: 1, alignItems: 'center', height: 40},
  fontColor: {color: '#222'},
  fontPirmaryColor: {color: primaryColor},
});

export default RootBottomTab;
