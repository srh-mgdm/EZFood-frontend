import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";

export default function IngredientsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  const days = useSelector((state) => state.days.value || []);
  const [ingredients, setIngredients] = useState([]);
  const [isChecked, setChecked] = useState(
    Array.isArray(ingredients) ? ingredients.map(() => false) : []
  );

  useEffect(() => {
    const meals = days.flatMap((day) => day.meals.map((meal) => meal.mealId));

    fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/ingredients/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mealIds: meals }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setLoading(false);
          setIngredients(data.shoppingList);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#7b4fff' />
        <Text>Chargement des ingrédients...</Text>
      </View>
    );
  }

  const handleCheckboxChange = (i) => {
    const newCheckedItems = [...isChecked];
    newCheckedItems[i] = !newCheckedItems[i];
    setChecked(newCheckedItems);
  };

  const content = ingredients.map((data, i) => (
    <View key={i} style={styles.ingredientItem}>
      <View style={styles.ingredientTextContainer}>
        <Checkbox
          value={isChecked[i]}
          onValueChange={() => handleCheckboxChange(i)}
        />
        <Text
          style={[
            styles.ingredientText,
            isChecked[i] ? { textDecorationLine: "line-through" } : {},
          ]}
        >
          {data.name}
        </Text>
      </View>
      <Text
        style={[
          styles.quantityText,
          isChecked[i] ? { textDecorationLine: "line-through" } : {},
        ]}
      >
        {data.qt} {data.unitType}
      </Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Header navigation={navigation} />
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.sectionContent}>
          {content}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    marginTop: "10%", // Safe area margin
    alignItems: "center",
  },
  head: {
    width: "100%",
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 80, // Creates space above the button container
  },
  sectionContent: {
    padding: 10,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
  },
  ingredientTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    paddingLeft: 10,
  },
  quantityText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "lightblue",
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
