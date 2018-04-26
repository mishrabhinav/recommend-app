import styled from 'styled-components';
import { SafeAreaView } from 'react-navigation';

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  padding: 10px 20px;
  margin: 0px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
`;

export const SettingsContainer = styled.ScrollView`
  flex: 1;
  background-color: #eaeaea;
  width: 100%;
  padding: 10px 0px;
`;

export const SettingsList = styled.ScrollView`
  flex: 1;
  width: 100%;
`;
