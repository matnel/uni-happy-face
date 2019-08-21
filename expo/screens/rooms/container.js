import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getRooms, linkUserRoom } from '../../store/actions'
import { PROFILE_ROUTE, NEW_ROOM_ROUTE } from '../../navigator/routes'
import RoomsScreen from './screen'

const RoomsScreenContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const rooms = useSelector(state => state.rooms.value)
  const hasLoaded = useSelector(state => state.rooms.hasLoaded)
  const userRooms = useSelector(state =>
    state.userData.value ? state.userData.value.rooms : []
  )
  const isFirstRun = useRef(true)

  const handlePressNew = useCallback(
    () => navigation.navigate(NEW_ROOM_ROUTE),
    []
  )

  const handlePressRoom = useCallback(room => {
    dispatch(linkUserRoom(room))
  }, [])

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(getRooms())
    }
  }, [])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      navigation.navigate(PROFILE_ROUTE, {
        room: userRooms[userRooms.length - 1],
      })
    }
  }, [userRooms.length])

  return (
    <RoomsScreen
      rooms={rooms}
      hasLoaded={hasLoaded}
      onPressNew={handlePressNew}
      onPressRoom={handlePressRoom}
    />
  )
}

export default RoomsScreenContainer
