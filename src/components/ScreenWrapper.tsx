import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {backgroundColors, colors} from '../constants/colors';

const ScreenWrapper = ({style, children, ...rest}) => {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <View
      style={[
        {backgroundColor: backgroundColors[theme] || colors.white, flex: 1},
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
