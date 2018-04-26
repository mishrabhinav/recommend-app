import React from 'react';
import {View, ActivityIndicator, LayoutAnimation} from 'react-native';
import {connect} from 'react-redux';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);

    this._checkIfLoggedIn = this._checkIfLoggedIn.bind(this);
    this._checkIfLoggedIn();
  }

  _checkIfLoggedIn() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.navigation.navigate(this.props.auth.accessToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#33a5ff"/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.get('auth').toJS()
  }
};

export default connect(mapStateToProps)(AuthLoading);
