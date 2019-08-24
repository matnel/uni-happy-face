import React from 'react'

import { ROOMS_ROUTE } from '../../navigator/routes'
import ProfileHeaderRight from './header-right'

const ProfileHeaderRightContainer = ({ navigation }) => (
  <ProfileHeaderRight onPressExit={() => navigation.navigate(ROOMS_ROUTE)} />
)

export default ProfileHeaderRightContainer
