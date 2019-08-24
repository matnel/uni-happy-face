import { createStackNavigator } from 'react-navigation'

import i18n from '../lib/i18n'
import theme from '../theme'
import {
  AUTH_LOADING_ROUTE,
  WELCOME_ROUTE,
  AUTHENTICATED_ROUTE,
  ROOMS_ROUTE,
} from './routes'
import AuthLoadingContainer from '../screens/auth-loading'
import WelcomeContainer from '../screens/welcome'
import AuthenticatedStackNavigator from './authenticated-stack'
import RoomsScreenContainer from '../screens/rooms'

const RoomsStackNavigator = createStackNavigator(
  {
    [ROOMS_ROUTE]: {
      screen: RoomsScreenContainer,
      navigationOptions: () => ({
        title: i18n.t('rooms.navigation.title'),
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#202020',
        borderBottomWidth: 0,
        shadowColor: theme.global.colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      headerTitleStyle: {
        color: theme.global.colors.text.high,
        fontSize: theme.global.font.size.medium,
      },
      headerTintColor: theme.global.colors.text.medium,
    },
  }
)

const MainStackNavigator = createStackNavigator(
  {
    [AUTH_LOADING_ROUTE]: {
      screen: AuthLoadingContainer,
    },
    [WELCOME_ROUTE]: {
      screen: WelcomeContainer,
    },
    [ROOMS_ROUTE]: {
      screen: RoomsStackNavigator,
    },
    [AUTHENTICATED_ROUTE]: {
      screen: AuthenticatedStackNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: AUTH_LOADING_ROUTE,
    headerMode: 'none',
    mode: 'modal',
  }
)

export default MainStackNavigator
