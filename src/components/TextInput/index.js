import React, { Component } from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.valid ? '#3B7CEC' : '#CFCFCF'};
  margin-top: 20px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  background-color: #FFFFFF;
  font-size: 17px;
`;

const Hint = styled.Text`
  color: #CFCFCF;
  font-size: 14px;
`;

const Error = styled(Hint)`
  color: #b30000;
`;

class TextInput extends Component {
  render () {
      const {
            onChange,
            placeholder,
            hint,
          } = this.props;


      let hintBody = hint;

      return (
            <StyledContainer>
              <Hint>{hintBody}</Hint>
              <StyledTextInput
                onChange={onChange}
                hint={hint}
                placeholder={placeholder}
                autoCapitalize='words'
                clearButtonMode='while-editing'
                returnKeyType={'next'}
              />
            </StyledContainer>
          );
    }
}

export default TextInput;
