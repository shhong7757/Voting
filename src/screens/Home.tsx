import React from 'react';
import {AppDispatch} from '../store';
<<<<<<< HEAD
import {GET_LIST_REFRESHING, GET_LIST_REQUEST} from '../actions';
=======
import {GET_LIST_REQUEST} from '../actions';
>>>>>>> ff93abb439275ce04b7faa58648bfda379fc682c
import {getHome} from '../reducers/selectors';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import VoteListItem from '../components/vote/VoteListItem';
import VoteListEmpty from '../components/vote/VoteListEmpty';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorScreen from '../components/common/ErrorScreen';

interface Props extends StackScreenProps<MainStackParamList, 'Home'> {}

function HomeScreen({navigation}: Props) {
  const {list} = useSelector(getHome);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch({type: GET_LIST_REQUEST});
  }, [dispatch]);

  const handlePressCreate = React.useCallback(() => {
    navigation.navigate('Create');
  }, [navigation]);

  const handlePressListItem = React.useCallback(() => {
    navigation.navigate('Detail');
  }, [navigation]);

  const handlePressRetry = React.useCallback(() => {
<<<<<<< HEAD
    dispatch({type: GET_LIST_REFRESHING});
=======
    dispatch({type: GET_LIST_REQUEST});
>>>>>>> ff93abb439275ce04b7faa58648bfda379fc682c
  }, [dispatch]);

  if (list.loading && list.data === undefined) {
    return <LoadingScreen />;
  } else if (list.error) {
    return <ErrorScreen error={list.error} onPressRetry={handlePressRetry} />;
  } else {
    if (list.data && list.data.length === 0) {
      return <VoteListEmpty onPressCreate={handlePressCreate} />;
    }

    return (
      <FlatList
        data={list.data || []}
        renderItem={({item}) => (
          <VoteListItem item={item} onPressItem={handlePressListItem} />
        )}
<<<<<<< HEAD
        keyExtractor={item => item.id}
        refreshing={list.refreshing}
        onRefresh={handlePressRetry}
=======
>>>>>>> ff93abb439275ce04b7faa58648bfda379fc682c
      />
    );
  }
}

export default HomeScreen;
