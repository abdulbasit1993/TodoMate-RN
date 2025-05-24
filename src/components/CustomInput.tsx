import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {borderColors, textColors} from '../constants/colors';

const CustomInput = ({value, onChangeText}) => {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <View style={[styles.container, {borderColor: borderColors[theme]}]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, {color: textColors[theme]}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ms(45),
    borderWidth: 1,
    borderRadius: ms(5),
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: ms(10),
  },
});

export default CustomInput;
