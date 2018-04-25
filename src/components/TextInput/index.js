import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledTextInput = styled.TextInput`
  height: 30px;
  background-color: #FFFFFF;
`;

class TextInput extends Component {
  render() {
    const {onChange, placeholder, value, style, keyboardType} = this.props;

    return (
      <StyledContainer style={style}>
        <StyledTextInput
          ref={(ref) => {this.input = ref}}
          onChange={onChange}
          placeholder={placeholder}
          clearButtonMode='while-editing'
          autoCapitalize='none'
          value={value}
          keyboardType={keyboardType}
        />
      </StyledContainer>
    );
  }
}

export default TextInput;
