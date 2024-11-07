import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Header } from "../components/Header";

export default function IngredientsScreen({ navigation }) {
  const dispatch = useDispatch();

  const days = useSelector((state) => state.days.value || []);


  const [ingredients, setIngredients] = useState([]);
  const [isChecked, setChecked] = useState(
    Array.isArray(ingredients) ? ingredients.map(() => false) : []
  );

  useEffect(() => {
    mealIds = [];
    meals = [];
    days.forEach((e) => {
      meals.push(e.meals);
    });

    const collectedMealIds = meals.flatMap((dayMeals) =>
      dayMeals.map((meal) => meal.mealId)
    );
    //console.log('Collected meal IDs:', collectedMealIds , 'Number of meals:',collectedMealIds.length);

   fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/ingredients/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mealIds: collectedMealIds })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        //console.log(data)
       setIngredients(data.shoppingList)
      }

    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

}, []);


const handleCheckboxChange = (i) => {
  const newCheckedItems = [...isChecked];
  newCheckedItems[i] = !newCheckedItems[i];
  setChecked(newCheckedItems);


};

  const content = ingredients.map((data, i) => (
    <View key={i} style={styles.card}>
      <View style={styles.ingredientItem }>
        <View style={styles.ingredientText}>
          <Checkbox value={isChecked[i]} onValueChange= {() => handleCheckboxChange(i)}/>
          <Text style={ [styles.ingredientText, ( isChecked[i] ? {textDecorationLine: 'line-through'} : {})] }>{data.name}</Text>
        </View>
        <Text style={ [styles.quantityText , isChecked[i] ? {textDecorationLine: 'line-through'} : {}] }>
          {data.qt} {data.unitType}
        </Text>
      </View>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.main}>
        <ScrollView contentContainerStyle={styles.sectionContent} >
          {content}
        </ScrollView>
      </View>

      {/* gradient for smooth fade over the list */}
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
        style={styles.gradientOverlay}
      />

      {/* action buttons at the bottom of the screen */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Retour à l'acceuil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    marginTop: "10%", // safe area
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  head: {
    height: 50,
    width: "100%",
    padding: 5,
  },
  main: {
    marginTop: '8%',
    height: '80%',
  },

  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 15,
    borderColor: "#e0e0e0",
    borderWidth: 1,

  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flexDirection: "row",
    paddingLeft: 10,
    width: '70%',
  },
  quantityText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    width: '30%',

  },
  bottomBorder: {
  height: 1,
  backgroundColor: "#e0e0e0",
  width: "100%",
  alignSelf: "center",
},

  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 60,
    height: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#7b4fff",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
