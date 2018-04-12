import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import RootNavigation from './src/nav';
import configureStore from './src/store';

const initialState = fromJS({});
const store = configureStore(initialState);

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    );
  }
}

export default AppRegistry.registerComponent('recommendapp', () => Root);
