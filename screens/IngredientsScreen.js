import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from "react";
import { Header } from "../components/Header";

export default function IngredientsScreen({ navigation , route }) {

    console.log(route.params)

    // useEffect(() => { 
    //     fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/meals/ingredients/${mealId}`)
    //     console.log(route.params)

    // }, [] )

 return (
   <View style={styles.container}>
        <View style={styles.head}>
            <Header navigation={navigation} />
        </View>
        <Text> TEST</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  
  
  container: {
    flex : 1,
    backgroundColor: 'lightblue',
  },

  head: {
    height: 50,
    width: "100%",
  },

})