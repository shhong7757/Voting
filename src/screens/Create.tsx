import React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import FormInputList from '../components/form/FormInputList';
import LoadingOverlay from '../components/common/LoadingOverlay';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {RootState} from '../reducers';
import {
  SET_FORM_DEADLINE,
  SET_FORM_START_DATE,
  SET_FORM_TITLE,
  SET_FORM_VOTE_LIST,
} from '../actions';
import WithValidateError from '../components/form/WithValidateError';
import FormDate from '../components/form/FormDate';

function CreateScreen() {
  const {deadline, list, title, loading, startDate, validationError} =
    useSelector((state: RootState) => state.form);

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeList = React.useCallback(
    (changedList: Array<string>) => {
      dispatch({
        type: SET_FORM_VOTE_LIST,
        payload: changedList,
      });
    },
    [dispatch],
  );

  const handleChangeDeadline = React.useCallback(
    (changedDate: Date) => {
      dispatch({
        type: SET_FORM_DEADLINE,
        payload: changedDate,
      });
    },
    [dispatch],
  );

  const handleChangeStartDate = React.useCallback(
    (changedDate: Date) => {
      dispatch({
        type: SET_FORM_START_DATE,
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

  const {rowWrapper} = styles;

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
          <WithValidateError errors={validationError} property="startDate">
            <FormDate
              date={startDate}
              maximumDate={deadline}
              minimumDate={new Date()}
              title="시작시간 설정"
              onChageDate={handleChangeStartDate}
            />
          </WithValidateError>
          <WithValidateError errors={validationError} property="deadline">
            <FormDate
              date={deadline}
              minimumDate={dayjs(startDate).toDate()}
              title="마감시간 설정"
              onChageDate={handleChangeDeadline}
            />
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
});

export default CreateScreen;
