import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {primaryColor} from '../../../constant';

interface ListProps {
  disabled?: boolean;
  list: Array<string>;
  selectedIdx: number;
  onChangeIndex?: (idx: number) => void;
}

interface ListItemProps {
  checkable?: boolean;
  disabled?: boolean;
  index: number;
  last?: boolean;
  listItem: string;
  selected?: boolean;
  onPressCheckBox?: (idx: number) => void;
}

function VoteBallotPaperItem({
  checkable = true,
  disabled = false,
  index,
  last = false,
  listItem,
  selected = false,
  onPressCheckBox,
}: ListItemProps) {
  const handlePress = React.useCallback(() => {
    if (onPressCheckBox) {
      onPressCheckBox(selected ? -1 : index);
    }
  }, [index, selected, onPressCheckBox]);

  const {
    wrapperBase,
    wrapperLast,
    valueWrapper,
    checkBoxBase,
    checkBoxSelected,
    checkBoxWrapper,
  } = styles;

  const checkBoxStyle = React.useMemo(
    () => (selected ? {...checkBoxSelected, ...checkBoxBase} : checkBoxBase),
    [checkBoxBase, checkBoxSelected, selected],
  );

  const wrapperStyle = React.useMemo(
    () =>
      last
        ? StyleSheet.compose(wrapperBase, {
            ...wrapperBase,
            ...wrapperLast,
          })
        : wrapperBase,
    [last, wrapperBase, wrapperLast],
  );

  return (
    <View style={wrapperStyle}>
      {checkable && (
        <Pressable
          disabled={disabled}
          style={checkBoxWrapper}
          onPress={handlePress}>
          <View style={checkBoxStyle} />
        </Pressable>
      )}
      <View style={valueWrapper}>
        <Text>{listItem}</Text>
      </View>
    </View>
  );
}

function DetailBallotPaper({
  list,
  selectedIdx: index,
  onChangeIndex,
}: ListProps) {
  const [selectedIdx, setSelectedIdx] = React.useState(index);

  React.useEffect(() => {
    if (onChangeIndex) {
      onChangeIndex(selectedIdx);
    }
  }, [selectedIdx, onChangeIndex]);

  return (
    <>
      {list.map((item, idx) => {
        let last = list.length - 1 === idx;
        const selected = selectedIdx === idx;

        return (
          <VoteBallotPaperItem
            index={idx}
            key={`vote-ballot-paper-item-${idx}`}
            selected={selected}
            last={last}
            listItem={item}
            onPressCheckBox={setSelectedIdx}
          />
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  wrapperBase: {paddingVertical: 8, flexDirection: 'row', alignItems: 'center'},
  wrapperLast: {paddingTop: 8},
  checkBoxWrapper: {marginRight: 8},
  checkBoxBase: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  checkBoxSelected: {
    backgroundColor: primaryColor,
  },
  valueWrapper: {},
});

export default DetailBallotPaper;
