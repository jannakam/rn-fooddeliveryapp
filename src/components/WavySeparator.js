import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';
import COLORS from '../constants/colors';

const WavySeparator = ({ color = COLORS.PRIMARY, height = 100 }) => {
  const { width: screenWidth } = Dimensions.get('window');
  return (
    <View style={{ width: screenWidth, height }}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ transform: [{ rotate: '180deg' }] }}
      >
         <Path
          fill={color}
          d="M0,160C360,320,1080,0,1440,160L1440,320L0,320Z"
        />
    </Svg>
    </View>
  );
};


export default WavySeparator;