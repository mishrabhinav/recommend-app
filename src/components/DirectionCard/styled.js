import styled from 'styled-components';

export const Card = styled.View`
  background-color: #fff;
  margin-horizontal: 10px;
  shadow-color: #000;
  shadow-radius: 10px;
  shadow-opacity: 1;
  height: ${props => props.height};
  width: ${props => props.width};
  overflow: hidden;
`;

export const TextContent = styled.View`
  flex: 1;
`;

export const CardHeader = styled.View`
  padding-horizontal: 10px
  flex-direction: row;
  height: ${props => props.height};
  align-items: center;
  justify-content: flex-start;
  background-color: #f9f9f9;
`;

export const CardBody = styled.View`
  padding: 10px
  flex: 1;
`;

export const CardTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-horizontal: 5px;
`;

export const CardDescription = styled.Text`
    font-size: 12px;
    color: #444;
`;
