import React from 'react';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';
import {LayoutAnimation} from 'react-native';
import * as styled from './styled';
import Auth0 from 'react-native-auth0';

import Button from '../../components/Button';
import Images from '../../assets/images';
import {setAuthTokens, setAuthError} from "./reducer";

const auth0 = new Auth0({domain: 'recommend-app.eu.auth0.com', clientId: '1KUr5pQ_ExvmJB5UbiA5NgcG-pdnxtJ2'});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this._redirectToAuth0 = this._redirectToAuth0.bind(this);
  }
  async _redirectToAuth0() {
    const {dispatch, navigation} = this.props;

    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: 'https://recommend-api.herokuapp.com'
      });

      console.log(credentials);
      dispatch(setAuthTokens(credentials));

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      navigation.navigate('App');
    } catch (error) {
      dispatch(setAuthError(fromJS(error)));
    }
  }

  render() {
    return (
      <styled.Container>
        <styled.ImageContainer>
          <styled.Image source={Images.login} />
          <styled.Image source={Images.login} />
        </styled.ImageContainer>
        <styled.Row>
          <Button title='Login or Sign Up' onPress={this._redirectToAuth0}/>
        </styled.Row>
      </styled.Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.getIn(['auth', 'error']).toJS(),
    auth: state.get('auth').toJS()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
