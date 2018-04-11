import { DrawerNavigator } from 'react-navigation';

import App from '../../containers/App';

const routeConfig = {
  Directions: {
    screen: App
  },
  History: {
    screen: App
  },
  Settings: {
    screen: App
  },
  About: {
    screen: App
  },
}

export default DrawerNavigator(routeConfig);
