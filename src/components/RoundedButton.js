import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import * as Colors from '../utils/colors'


export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[textStyle, styles(size).text]} onPress={props.onPress}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: Colors.FONT_COLOR,
      borderWidth: 2,
    },
    text: {
      color: Colors.FONT_COLOR,
      fontSize: size / 3,
    },
  });
