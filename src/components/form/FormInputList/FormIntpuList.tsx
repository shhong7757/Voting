import React from 'react';
import Button from '../../common/Button';
import {
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
} from 'react-native';
import {Platform} from 'react-native';

interface Props {
  list: Array<string>;
  onChangeList?: (list: Array<string>) => void;
}

function FormIntpuList({list, onChangeList}: Props) {
  const [listItems, setListItems] = React.useState<Array<string>>(list);

  React.useEffect(() => {
    if (onChangeList) {
      onChangeList(listItems);
    }
  }, [listItems, onChangeList]);

  const handlePressAddItem = React.useCallback(
    () => setListItems(prevItems => [...prevItems, '']),
    [],
  );

  const handlePressRemoveItem = React.useCallback(
    (idx: number) => {
      if (listItems.length <= 3) {
        Alert.alert('투표항목은 최소 3개 이상이여야 합니다.');
      } else {
        const newItems = [...listItems];
        newItems.splice(idx, 1);
        setListItems(newItems);
      }
    },
    [listItems],
  );

  const handleChangeText = React.useCallback(
    (text: string, idx) => {
      const newItems = [...listItems];
      newItems[idx] = text;
      setListItems(newItems);
    },
    [listItems],
  );

  const {addButtonText, buttonWrapper, fl1, itemWrapper} = styles;

  return (
    <>
      {listItems.map((item, idx) => {
        return (
          <View key={`vote-list-item-${idx}`} style={itemWrapper}>
            <View style={fl1}>
              <TextInput
                placeholder="항목 입력"
                value={item}
                onChangeText={text => handleChangeText(text, idx)}
              />
            </View>
            <Pressable onPress={() => handlePressRemoveItem(idx)}>
              <Text>삭제</Text>
            </Pressable>
          </View>
        );
      })}
      <View style={buttonWrapper}>
        <Button onPress={handlePressAddItem}>
          <Text style={addButtonText}>항목 추가</Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  addButtonText: {color: 'white'},
  buttonWrapper: {marginTop: 8},
  fl1: {flex: 1},
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 8 : undefined,
  },
});

export default FormIntpuList;
