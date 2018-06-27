import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  background-color: #f6f9f7;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
`;

class TextInput extends Component {
  render() {
    const {onChangeText, placeholder, value, style, keyboardType} = this.props;

    return (
      <StyledContainer style={style}>
        <StyledTextInput
          ref={(ref) => {this.input = ref}}
          onChangeText={onChangeText}
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
