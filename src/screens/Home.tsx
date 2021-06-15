import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<MainStackParamList, 'Home'> {}

function HomeScreen({navigation}: Props) {
  const handlePressCreate = React.useCallback(() => {
    navigation.navigate('Create');
  }, [navigation]);

  const handlePressListItem = React.useCallback(() => {
    navigation.navigate('Detail');
  }, [navigation]);

  const {body, button} = styles;

  return (
    <View style={body}>
      <Pressable style={button} onPress={handlePressCreate}>
        <Text>Create</Text>
      </Pressable>
      <Pressable style={button} onPress={handlePressListItem}>
        <Text>Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default HomeScreen;
