import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkExistingUser } from '../../store/actions'
import {
  WELCOME_ROUTE,
  ROOMS_ROUTE,
  PROFILE_ROUTE,
} from '../../navigator/routes'
import { logout } from '../../lib/auth'
import AuthLoadingScreen from './screen'

const AuthLoadingContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const hasCheckedExistingUser = useSelector(
    state => state.hasCheckedExistingUser
  )
  const user = useSelector(state => state.userData.value)
  const selectedRoom = useSelector(state => state.selectedRoom)

  useEffect(() => {
    dispatch(checkExistingUser())
  }, [])

  const navigateBasedOnAuthState = async () => {
    if (hasCheckedExistingUser) {
      if (user) {
        if (selectedRoom) {
          navigation.navigate(PROFILE_ROUTE)
        } else {
          navigation.navigate(ROOMS_ROUTE)
        }
      } else {
        await logout()
        navigation.navigate(WELCOME_ROUTE)
      }
    }
  }

  useEffect(() => {
    navigateBasedOnAuthState()
  }, [hasCheckedExistingUser])

  return <AuthLoadingScreen />
}

export default AuthLoadingContainer
