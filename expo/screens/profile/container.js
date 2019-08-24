import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deleteCurrentEntry, getUserRoomEntries } from '../../store/actions'
import { NEW_ENTRY_ROUTE, ENTRY_ROUTE } from '../../navigator/routes'
import ProfileNavigationTitle from './navigation-title'
import ProfileScreen from './screen'

const ProfileContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const entries = useSelector(state => state.userRoomEntries.value)
  const currentEntry = useSelector(state => state.userCurrentEntry.value)
  const deletingCurrentEntry = useSelector(
    state => state.userCurrentEntry.deleting
  )
  const hasLoadedEntries = useSelector(state => state.userRoomEntries.hasLoaded)
  const selectedRoom = useSelector(state => state.selectedRoom)
  const user = useSelector(state => state.userData.value)

  const handlePressInput = () => navigation.navigate(NEW_ENTRY_ROUTE)
  const handlePressEntry = entry => navigation.navigate(ENTRY_ROUTE, { entry })
  const handlePressDeleteCurrentEntry = () => dispatch(deleteCurrentEntry())

  useEffect(() => {
    if (selectedRoom && !hasLoadedEntries) {
      dispatch(getUserRoomEntries(selectedRoom))
    }
  }, [selectedRoom, hasLoadedEntries])

  return (
    <ProfileScreen
      currentEntry={currentEntry}
      entries={entries}
      onPressInput={handlePressInput}
      onPressEntry={handlePressEntry}
      onPressDeleteCurrentEntry={handlePressDeleteCurrentEntry}
      isDeleting={deletingCurrentEntry}
      user={user}
    />
  )
}

ProfileContainer.navigationOptions = {
  headerTitle: <ProfileNavigationTitle />,
}

export default ProfileContainer
