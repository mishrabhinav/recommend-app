import React from 'react';
import styled from 'styled-components';

const colorMap = {
  'disabled': '#ececec',
  'primary': '#008fff',
  'danger': '#e6000e',
  'success': '#00b34f'
};

const textMap = {
  'disabled': '#000000',
  'primary': '#ffffff',
  'danger': '#ffffff',
  'success': '#ffffff'
};

const Container = styled.TouchableOpacity`
  flex: 1;
  background-color: ${props => colorMap[props.mode]};
  align-items: center;
  justify-content: center;
  height: ${props => props.height};
  border-radius: ${props => props.noRound ? 0 : 5};
`;

const Text = styled.Text`
  color: ${props => textMap[props.mode]};
`;

class Button extends React.Component {
  render() {
    const {
      title,
      onPress,
      mode,
      noRound,
      height,
      style,
      disabled
    } = this.props;

    return (
      <Container
        onPress={() => !disabled ? onPress() : undefined}
        height={height || 40}
        mode={mode || 'primary'}
        noRound={noRound}
        style={style || {}}
        activeOpacity={!disabled ? 0.6 : 1}>
        {typeof title === 'string' ? <Text mode={mode || 'primary'}>{title || 'Button'}</Text> : title}
      </Container>
    );
  }
}

export default Button;