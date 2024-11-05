import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";

export default function IngredientsScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([]);
  const days = useSelector((state) => state.days.value || []);

  useEffect(() => {
    mealIds = [];
    meals = [];
    days.forEach((e) => {
      meals.push(e.meals);
    });

    const collectedMealIds = meals.flatMap((dayMeals) =>
      dayMeals.map((meal) => meal.mealId)
    );
    // console.log('Collected meal IDs:', collectedMealIds , 'Number of meals:',collectedMealIds.length);

    fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/meals/ingredientslist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mealIds: collectedMealIds }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setIngredients(data.shoppingList);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [days]);

  const content = ingredients.map((data, i) => (
    <View key={i} style={styles.card}>
      <View style={styles.ingredientItem}>
        <Text style={styles.ingredientText}>{data.name}</Text>
        <Text style={styles.quantityText}>
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
      <ScrollView contentContainerStyle={styles.sectionContent}>
        <View>{content}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    marginTop: "10%", // safe area
  },
  head: {
    height: 50,
    width: "100%",
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginVertical: 60, // من
    paddingBottom: 15,
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
  },
  quantityText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
