import React from 'react'
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native'

const sections = [
  {
    title: "Gestures",
    data: ["withOffset", "withDecay", "withSpring", "preserveMultiplicativeOffset", "PanGestureHelpers"]
  }
]

const Home = ({ navigation }) => {
  const renderItem = ({ item }) =>
    <TouchableOpacity onPress={() => navigation.navigate(item)} style={styles.item}>
      <Text style={styles.itemName}>{item}</Text>
    </TouchableOpacity>


  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    height: 50,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15
  },
  divider: {
    height: 1,
    backgroundColor: '#aaa'
  },
  header: {
    backgroundColor: "#fff",
    fontSize: 17,
  },
})
