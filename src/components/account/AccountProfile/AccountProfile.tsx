import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';

import {getAccountThumbnailSource} from '../../../lib/account';

interface Props {
  account?: Account;
}

function AccountProfile({account}: Props) {
  const {wrapper, image, text, textWrapper} = styles;

  const [name, source] = React.useMemo(() => {
    if (account) {
      return [account.name, getAccountThumbnailSource(account.id)];
    }
    return ['undefined', getAccountThumbnailSource(-1)];
  }, [account]);

  return (
    <View style={wrapper}>
      <Image style={image} source={source} />
      <View style={textWrapper}>
        <Text style={text}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row', alignItems: 'center'},
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  textWrapper: {
    marginLeft: 16,
  },
  text: {},
});

export default AccountProfile;
