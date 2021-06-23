import {NavigationContainerRef, StackActions} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function goBack() {
  navigationRef.current?.goBack();
}

export function pop() {
  navigationRef.current?.dispatch(StackActions.pop(1));
}
