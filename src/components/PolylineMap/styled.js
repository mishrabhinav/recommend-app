import styled from 'styled-components';
import {Animated, Dimensions} from 'react-native';

const {width} = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  width: ${width};
  height: 100%;
`;

export const ScrollView = styled(Animated.ScrollView)`
  position: absolute;
  bottom: 10px;
  left: 0px;
  right: 0px;
`;
