import React from 'react';
import {Form} from '../../../reducers';
import {getFormValidationMessage} from '../../../lib/validation';
import {View, StyleSheet, Text} from 'react-native';

interface Props {
  property: keyof Omit<Form, 'validationError' | 'loading'>;
  errors: Array<keyof Omit<Form, 'validationError' | 'loading'>>;
}

function WithValidateError({
  children,
  errors,
  property,
}: React.PropsWithChildren<Props>) {
  const hasValidateError = React.useMemo(
    () => errors.includes(property),
    [errors, property],
  );

  const {text, textWrapper} = styles;

  return (
    <>
      {children}
      {hasValidateError && (
        <View style={textWrapper}>
          <Text style={text}>{getFormValidationMessage(property)}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textWrapper: {paddingTop: 8},
  text: {color: 'red'},
});

export default WithValidateError;
