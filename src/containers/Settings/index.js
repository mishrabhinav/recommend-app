import React from 'react';
import { Text } from 'react-native';
import * as styled from './styled';

import Header from '../../components/Header';

class Settings extends React.Component {
  render() {
    return (
      <styled.Container>
        <Header title='Settings'/>
        <styled.SettingsContainer>
          <Text>Settings Container</Text>
        </styled.SettingsContainer>
      </styled.Container>
    );
  }
}

export default Settings;