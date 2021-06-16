import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';

import Image1 from '../../../assets/garden.jpg';
import Image2 from '../../../assets/marguerite.jpg';
import Image3 from '../../../assets/pink.jpg';
import Image4 from '../../../assets/rose.jpg';
import Image5 from '../../../assets/rose2.jpg';

interface Props {
  account: Account;
}

function AccountProfile({account}: Props) {
  const {wrapper, image, text, textWrapper} = styles;

  const url = React.useMemo(() => {
    const arr = [Image1, Image2, Image3, Image4, Image5];
    const idx = account.id % arr.length;

    return arr[idx];
  }, [account]);

  return (
    <View style={wrapper}>
      <Image style={image} source={url} />
      <View style={textWrapper}>
        <Text style={text}>{account.name}</Text>
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
