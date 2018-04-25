import React from 'react';
import { TabNavigator, StackNavigator, SwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import App from '../containers/App';
import History from '../containers/History';
import Settings from '../containers/Settings';
import Login from '../containers/Login';
import AuthLoading from '../containers/AuthLoading';

const appRouteConfig = {
  History: {
    screen: History
  },
  Directions: {
    screen: App
  },
  Settings: {
    screen: Settings,
    title: 'Settings'
  }
};

const appNavigatorConfig = {
  initialRouteName: 'Settings',
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName === 'History') {
        return <Icon name='history' size={25} color={tintColor} />;
      } else if (routeName == 'Directions') {
        return <Icon2 name='directions-fork' size={25} color={tintColor} />;
      } else if (routeName == 'Settings') {
        return <Icon name='settings' size={25} color={tintColor} />;
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: '#33a5ff',
    inactiveTintColor: 'gray',
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
};

const authRouteConfig = {
  Login: Login
};

const authNavigatorConfig = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
};

const AppStack = TabNavigator(appRouteConfig, appNavigatorConfig);
const AuthStack = StackNavigator(authRouteConfig, authNavigatorConfig);

export default SwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
