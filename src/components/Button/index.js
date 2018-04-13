import React from 'react';
import styled from 'styled-components';

const Container = styled.TouchableOpacity`
  flex: 1;
  background-color: ${props => props.active ? '#33a5ff' : '#ececec'};
  align-items: center;
  justify-content: center;
  height: 40;
  border-radius: 5;
`;

const Text = styled.Text`
  color: ${props => props.active ? '#ffffff' : '#000000'};
`;

class Button extends React.Component {
  render() {
    const { title, onPress,  active } = this.props;

    return (
      <Container onPress={active && onPress} active={active} activeOpacity={active ? 0.6 : 1}>
        <Text active={active}>{title || 'Button'}</Text>
      </Container>
    );
  }
}

export default Button;