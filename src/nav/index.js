import { DrawerNavigator } from 'react-navigation';

import App from '../containers/App';
import About from '../containers/About';
import History from '../containers/History';
import Settings from '../containers/Settings';

const routeConfig = {
  Directions: {
    screen: App
  },
  History: {
    screen: History
  },
  Settings: {
    screen: Settings
  },
  About: {
    screen: About
  },
};

export default DrawerNavigator(routeConfig);
