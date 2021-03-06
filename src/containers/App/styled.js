import styled from 'styled-components';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import RNMapView from 'react-native-maps';

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const PastContainer = styled.View`
  flex: 2;
  width: 100%;
  background-color: #f9f9f9;
  align-items: center;
  padding: 0px 0px 10px;
`;

export const SpinnerView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: ${() => Dimensions.get('window').width};
  height: 100%;
`;

export const MapView = styled(RNMapView)`
  width: ${() => Dimensions.get('window').width};
  height: 100%;
`;

export const StartRow = styled.View`
  margin: 0px 20px;
  flex-direction: row;
`;

export const Row = styled.View`
  margin: 0px 20px;
  flex-direction: row;
`;

export const DestRow = styled.View`
  margin: 10px 20px;
  flex-direction: row;
`;

export const List = styled.FlatList`
  width: 100%;
  padding: 10px 10px;
`;
