import React from 'react';
import {Text} from 'react-native';
import {textColors} from '../constants/colors';
import {useSelector} from 'react-redux';

interface CustomTextProps {
  children: React.ReactNode;
  style?: any;
}

const CustomText: React.FC<CustomTextProps> = ({children, style}) => {
  const theme = useSelector(state => state.themeReducer.theme);

  return <Text style={[{color: textColors[theme]}, style]}>{children}</Text>;
};

export default CustomText;
