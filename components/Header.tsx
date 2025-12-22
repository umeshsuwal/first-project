import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { iconSize } from '@/constants/dimensions'

const Header = () => {
  return (
    <View style={styles.container}>
      <Ionicons name={"arrow-back"} size={iconSize.md} color="black" />
      <Octicons name={"gear"} size={iconSize.md} color="black" />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
})