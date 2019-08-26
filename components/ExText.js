import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ExText = props => {
  const { children, style, ...rest } = props;

  const mergedStyle = { ...styles.exText, ...style };
  return (
    <Text style={mergedStyle} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  exText: {
    fontSize: 24,
  },
});

export default ExText;
