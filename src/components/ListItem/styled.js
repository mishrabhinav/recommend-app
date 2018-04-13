import styled from 'styled-components';

export const Headline = styled.TouchableOpacity`
  flex-direction: row;
  height: ${props => props.height};
  margin: ${props => props.showDescription ? '10px 10px 0px' : '10px 10px'};
  align-items: center;
  justify-content: center;
`;

export const Information = styled.View`
  width: ${props => props.width - 40};
  background-color: white;
  margin: 0px 10px 10px;
  padding: 10px;
  align-items: flex-start;
`;

export const Mode = styled.View`
  height: ${props => props.height};
  width: ${props => props.height};
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const Summary = styled.View`
  flex: 1;
  background-color: #ededed;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
