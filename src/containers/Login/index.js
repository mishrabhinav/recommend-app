import React from 'react';
import {View, Text} from 'react-native';
import * as styled from './styled';
import Auth0 from 'react-native-auth0';

import Button from '../../components/Button';

const auth0 = new Auth0({domain: 'recommend-app.eu.auth0.com', clientId: '1KUr5pQ_ExvmJB5UbiA5NgcG-pdnxtJ2'});

class Login extends React.Component {
  async _redirectToAuth0() {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: 'https://recommend-api.herokuapp.com'
      });
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <styled.Container>
        <styled.ImageContainer>
          <Text>Login Page</Text>
        </styled.ImageContainer>
        <styled.Row>
          <Button active={true} title='Login or Sign Up' onPress={this._redirectToAuth0}/>
        </styled.Row>
      </styled.Container>
    );
  }
}

export default Login;
