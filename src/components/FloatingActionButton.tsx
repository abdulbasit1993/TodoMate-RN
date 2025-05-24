import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../constants/colors';
import {ms} from 'react-native-size-matters';

const FloatingActionButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.9}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ms(50),
    height: ms(50),
    borderRadius: 90,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: ms(20),
    bottom: ms(70),
  },
  plus: {
    color: colors.black,
    fontSize: ms(30),
  },
});

export default FloatingActionButton;
