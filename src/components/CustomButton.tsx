import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../constants/colors';
import {ms} from 'react-native-size-matters';

const CustomButton = ({title, onPress, customStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, customStyle]}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: ms(120),
    height: ms(40),
    borderRadius: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
