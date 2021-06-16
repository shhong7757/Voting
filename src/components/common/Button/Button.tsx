import React from 'react';
import {Pressable, PressableProps, StyleSheet} from 'react-native';
import {primaryColor} from '../../../constant';

interface Props extends Omit<PressableProps, 'style'> {
  backgroundColor?: string;
}

function Button({
  backgroundColor = primaryColor,
  children,
  disabled,
  ...pressableProps
}: React.PropsWithChildren<Props>) {
  const {button} = styles;

  const style = React.useMemo(
    () => ({...button, backgroundColor: disabled ? 'gray' : backgroundColor}),
    [backgroundColor, button, disabled],
  );

  return (
    <Pressable {...pressableProps} style={style}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});

export default Button;
