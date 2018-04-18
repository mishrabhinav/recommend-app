import React from 'react';
import { Text } from 'react-native';
import * as styled from './styled';

import Header from '../../components/Header';

class History extends React.Component {
  render() {
    return (
      <styled.Container>
        <Header title='History'/>
        <styled.HistoryContainer>
          <Text>History Container</Text>
        </styled.HistoryContainer>
      </styled.Container>
    );
  }
}

export default History;