import styled from 'styled-components';
import { SafeAreaView } from 'react-navigation';

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

export const Row = styled.View`
  margin: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #ff0000;
`;
