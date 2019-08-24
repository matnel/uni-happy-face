import React from 'react'
import { createStackNavigator } from 'react-navigation'

import i18n from '../lib/i18n'
import theme from '../theme'
import {
  NEW_ENTRY_ROUTE,
  CONFIRM_ENTRY_ROUTE,
  PROFILE_ROUTE,
  ENTRY_ROUTE,
} from './routes'
import NewEntryContainer from '../screens/new-entry'
import ConfirmEntryContainer from '../screens/confirm-entry'
import ProfileContainer from '../screens/profile'
import ProfileHeaderRightContainer from '../screens/profile/header-right-container'
import EntryContainer from '../screens/entry'

const AuthenticatedStackNavigator = createStackNavigator(
  {
    [PROFILE_ROUTE]: {
      screen: ProfileContainer,
      navigationOptions: ({ navigation }) => ({
        headerBackTitle: i18n.t('profile.navigation.headerBackTitle'),
        headerRight: <ProfileHeaderRightContainer navigation={navigation} />,
      }),
    },
    [ENTRY_ROUTE]: {
      screen: EntryContainer,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('entry.navigation.title', {
          week: navigation.getParam('entry').week,
        }),
      }),
    },
    [NEW_ENTRY_ROUTE]: {
      screen: NewEntryContainer,
      navigationOptions: () => ({
        title: i18n.t('newEntry.navigation.title'),
        headerBackTitle: i18n.t('newEntry.navigation.backTitle'),
      }),
    },
    [CONFIRM_ENTRY_ROUTE]: {
      screen: ConfirmEntryContainer,
      navigationOptions: () => ({
        title: i18n.t('confirmEntry.navigation.title'),
      }),
    },
  },
  {
    initialRouteName: PROFILE_ROUTE,
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

export default AuthenticatedStackNavigator
