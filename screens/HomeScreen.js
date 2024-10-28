import { View, Text, StyleSheet, KeyboardAvoidingView, Pressable } from 'react-native'
import React from 'react'

export default function HomeScreen ({navigation}) {
  return (
    <View style={styles.container}>
      <Text>home Screen</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    }
})
