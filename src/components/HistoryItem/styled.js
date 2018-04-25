import styled from 'styled-components';

export const Headline = styled.TouchableOpacity`
  flex-direction: row;
  height: ${props => props.height};
  margin: 10px 0px 0px;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  height: ${props => props.height};
  width: 100%;
  flex-direction: row;
  background-color: #ffffff;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Directions = styled.View`
  width: 100%;
  background-color: #ffffff;
  align-items: flex-start;
  padding: 10px;
`;

export const Information = styled.View`
  width: 100%;
  background-color: white;
  align-items: flex-start;
`;

export const Mode = styled.View`
  height: ${props => props.height};
  width: ${props => props.height};
  align-items: center;
  justify-content: center;
  background-color: #33a5ff;
`;

export const Summary = styled.View`
  flex: 1;
  background-color: white;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
