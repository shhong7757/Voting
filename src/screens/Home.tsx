import React from 'react';
import {AppDispatch} from '../store';
import {GET_LIST_REFRESHING, GET_LIST_REQUEST} from '../actions';
import {getHome} from '../reducers/selectors';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import VoteListItem from '../components/vote/VoteListItem';
import VoteListEmpty from '../components/vote/VoteListEmpty';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorScreen from '../components/common/ErrorScreen';
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const {list} = useSelector(getHome);

  const navigation = useNavigation();

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch({type: GET_LIST_REQUEST});
  }, [dispatch]);

  const handlePressCreate = React.useCallback(() => {
    navigation.navigate('Create');
  }, [navigation]);

  const handlePressListItem = React.useCallback(
    (vote: Vote) => {
      navigation.navigate('Detail', {id: vote.id, title: vote.title});
    },
    [navigation],
  );

  const handlePressRetry = React.useCallback(() => {
    dispatch({type: GET_LIST_REFRESHING});
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
        keyExtractor={item => item.id}
        refreshing={list.refreshing}
        onRefresh={handlePressRetry}
      />
    );
  }
}

export default HomeScreen;
