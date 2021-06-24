import React from 'react';
import {View} from 'react-native';

import * as svgs from '../../../assets/svg';

export type SvgType = keyof typeof svgs;

interface Props {
  fill?: string;
  svg?: SvgType;
  size?: number;
}

function Svg({fill = 'black', svg, size = 15}: Props) {
  if (svg === undefined) {
    return <View />;
  }

  const SVG = svgs[svg];
  return <SVG fill={fill} width={size} height={size} />;
}

export default Svg;
