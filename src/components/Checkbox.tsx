import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {borderColors, textColors} from '../constants/colors';
import {useSelector} from 'react-redux';

const Checkbox = ({checked, onPress}) => {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <TouchableOpacity
      style={[styles.container, {borderColor: borderColors[theme]}]}
      onPress={onPress}
      activeOpacity={0.7}>
      {checked && (
        <MaterialCommunityIcon
          name="check"
          size={ms(15)}
          color={textColors[theme]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ms(20),
    height: ms(20),
    borderRadius: ms(5),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Checkbox;
