import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
  mT?: number;
  mB?: number;
  mL?: number;
  mR?: number;
}

const Spacer = ({
  mT: marginTop,
  mB: marginBottom,
  mL: marginLeft,
  mR: marginRight,
}) => {
  return <View style={{marginTop, marginBottom, marginLeft, marginRight}} />;
};

export default Spacer;
