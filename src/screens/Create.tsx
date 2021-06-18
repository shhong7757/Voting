import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import FormInputList from '../components/form/FormInputList';
import LoadingOverlay from '../components/common/LoadingOverlay';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {RootState} from '../reducers';
import {
  SET_FORM_DEADLINE,
  SET_FORM_TITLE,
  SET_FORM_VOTE_LIST,
} from '../actions';
import WithValidateError from '../components/form/WithValidateError';

function CreateScreen() {
  const {deadline, list, title, loading, validationError} = useSelector(
    (state: RootState) => state.form,
  );

  const dispatch = useDispatch<AppDispatch>();

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handlePressEditDate = React.useCallback(
    () => setShowDatePicker(prevShowDatePicker => !prevShowDatePicker),
    [],
  );

  const handleChangeList = React.useCallback(
    (changedList: Array<string>) => {
      dispatch({
        type: SET_FORM_VOTE_LIST,
        payload: changedList,
      });
    },
    [dispatch],
  );

  const handleChangeDate = React.useCallback(
    (changedDate: Date) => {
      dispatch({
        type: SET_FORM_DEADLINE,
        payload: changedDate,
      });
    },
    [dispatch],
  );

  const handleChangeTitle = React.useCallback(
    (text: string) => {
      dispatch({type: SET_FORM_TITLE, payload: text});
    },
    [dispatch],
  );

  const {datePickerWrapper, fldr, fl1, rowWrapper} = styles;

  return (
    <>
      <LoadingOverlay visible={loading} />
      <ScrollView bounces={false}>
        <View style={rowWrapper}>
          <WithValidateError errors={validationError} property="title">
            <TextInput
              placeholder="투표 제목"
              value={title}
              onChangeText={handleChangeTitle}
            />
          </WithValidateError>
        </View>
        <View style={rowWrapper}>
          <WithValidateError errors={validationError} property="deadline">
            <View style={fldr}>
              <View style={fl1}>
                <Text>마감시간 설정</Text>
              </View>
              <Pressable onPress={handlePressEditDate}>
                <Text>{showDatePicker ? '완료' : '수정'}</Text>
              </Pressable>
            </View>
            <Text>{dayjs(deadline).format('llll')}</Text>
            <View style={datePickerWrapper}>
              {showDatePicker && (
                <DatePicker
                  date={deadline}
                  onDateChange={handleChangeDate}
                  locale="ko"
                  minimumDate={new Date()}
                />
              )}
            </View>
          </WithValidateError>
        </View>
        <View style={rowWrapper}>
          <WithValidateError errors={validationError} property="list">
            <FormInputList list={list} onChangeList={handleChangeList} />
          </WithValidateError>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  datePickerWrapper: {alignItems: 'center'},
  fl1: {flex: 1},
  fldr: {flexDirection: 'row'},
});

export default CreateScreen;
