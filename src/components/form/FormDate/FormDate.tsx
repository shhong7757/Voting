import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import dayjs from 'dayjs';

interface Props {
  date: Date;
  title: string;
  maximumDate?: Date;
  minimumDate?: Date;
  onChageDate?: (date: Date) => void;
}

function FormDate({date, title, maximumDate, minimumDate, onChageDate}: Props) {
  const [show, setShow] = React.useState(false);
  const [tmpDate, setTmpDate] = React.useState(date);

  React.useEffect(() => {
    if (onChageDate) {
      onChageDate(tmpDate);
    }
  }, [tmpDate, onChageDate]);

  const {datePickerWrapper, fldr, fl1, mv8} = styles;

  return (
    <>
      <View style={[fldr, mv8]}>
        <View style={fl1}>
          <Text>{title}</Text>
        </View>
        <Pressable onPress={() => setShow(prevShow => !prevShow)}>
          <Text>{show ? '완료' : '수정'}</Text>
        </Pressable>
      </View>
      <Text>{dayjs(tmpDate).format('llll')}</Text>
      <View style={datePickerWrapper}>
        {show && (
          <DatePicker
            date={tmpDate}
            onDateChange={setTmpDate}
            locale="ko"
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  datePickerWrapper: {alignItems: 'center'},
  fl1: {flex: 1},
  fldr: {flexDirection: 'row'},
  mv8: {marginVertical: 8},
});

export default FormDate;
