import React from 'react';
import {connect} from 'react-redux';
import { View, ActivityIndicator } from 'react-native';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);

    this._checkIfLoggedIn = this._checkIfLoggedIn.bind(this);
    this._checkIfLoggedIn();
  }

  _checkIfLoggedIn() {
    this.props.navigation.navigate('Auth');
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
    auth: state.get('auth')
  }
};

export default connect(mapStateToProps)(AuthLoading);
