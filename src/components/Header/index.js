import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  width: 100%;
  margin: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
`;

function header({ title }) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

export default header;
