import React, {Component} from 'react';
import {fromJS} from 'immutable';
import {AppRegistry, View, ActivityIndicator, AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist-immutable';

import RootNavigation from './src/nav';
import configureStore from './src/store';

const initialState = fromJS({});
const store = configureStore(initialState);

class Root extends Component {
  constructor() {
    super();

    this.state = {
      rehydrated: false
    };

    persistStore(store, {
      whitelist: ['auth', 'settings'],
      storage: AsyncStorage
    }, () => {
      this.setState({
        rehydrated: true
      });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#33a5ff"/>
        </View>
      );
    }

    return (
      <Provider store={store}>
        <RootNavigation/>
      </Provider>
    );
  }
}

export default AppRegistry.registerComponent('recommendapp', () => Root);
