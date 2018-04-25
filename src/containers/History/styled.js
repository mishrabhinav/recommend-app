import styled from 'styled-components';
import { SafeAreaView } from 'react-navigation';

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  margin: 20px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HistoryContainer = styled.View`
  flex: 1;
  background-color: #f7f7f7;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 10px 10px;
`;

export const List = styled.FlatList`
  width: 100%;
`;
