import React from 'react'
import { useSelector } from 'react-redux'
import { Text, StyleSheet } from 'react-native'

import theme from '../../theme'

const ProfileNavigationTitle = () => {
  const room = useSelector(state => state.selectedRoom)
  return <Text style={styles.title}>{room && room.name}</Text>
}

const styles = StyleSheet.create({
  title: {
    color: theme.global.colors.text.high,
    fontSize: theme.global.font.size.medium,
    fontWeight: 'bold',
  },
})

export default ProfileNavigationTitle
