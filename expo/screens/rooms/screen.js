import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'

import theme from '../../theme'
import i18n from '../../lib/i18n'

const RoomsScreen = ({ rooms, hasLoaded, onPressRoom }) => (
  <View style={styles.container}>
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={rooms}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <View />}
      ListFooterComponent={() => <View />}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onPressRoom(item)}>
          <Text style={styles.itemLabel}>{item.name}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={() => (
        <View style={styles.listEmpty}>
          {!hasLoaded && (
            <ActivityIndicator color={theme.global.colors.white} />
          )}
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.global.colors.background,
  },
  list: {},
  listContent: {},
  listEmpty: {
    paddingVertical: theme.global.space.medium,
  },
  item: {
    paddingHorizontal: theme.global.space.medium,
    paddingVertical: theme.global.space.small,
  },
  itemLabel: {
    color: theme.global.colors.text.high,
    fontSize: theme.global.font.size.large,
  },
  itemSeparator: {
    borderBottomColor: theme.global.colors.elevation[1],
    borderBottomWidth: 2,
    marginLeft: theme.global.space.medium,
  },
})

export default RoomsScreen
