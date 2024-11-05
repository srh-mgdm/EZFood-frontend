import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const handleRemoveMeal = (dayId, mealPosition) => {
  // Call backend to delete the meal from the database
  // it is done by updating (PUT route) the meals array at the given position
  fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/days/meal/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      dayId: dayId,
      mealPosition: mealPosition,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.result) {
        console.error("Error deleting meal:", data.error);
        return;
      }

      // Dispatch action to remove meal from store
      dispatch(deleteMealFromDay({ dayId, mealPosition }));
      setRefresh(!refresh); // Trigger a refresh of the screen
    })
    .catch((error) => console.error("Error deleting meal:", error));
};

export default function MealScreen({ navigation, route }) {
  const { mealId, dayId, mealPosition, previousScreen } = route.params;
  return (
    <View style={styles.container}>
      <Image source={require("../assets/EZFood.png")} style={styles.logo} />

      {/* check meal detail by going to the MealDetail screen */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("MealDetailScreen", {
              dayId: dayId,
              mealId: mealId,
              mealPosition: mealPosition,
              previousScreen: "MealAction",
            })
          }
        >
          <Text style={styles.buttonText}>Voir les détails</Text>
        </TouchableOpacity>

        {/* change the meal by going to the Search screen */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("SearchMeal", {
              dayId: dayId,
              mealId: mealId,
              mealPosition: mealPosition,
              previousScreen: "MealAction",
            })
          }
        >
          <Text style={styles.buttonText}>Changer le repas</Text>
        </TouchableOpacity>

        {/* remove the selected meal from the selected day */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Home", {
              dayId: dayId,
              mealId: mealId,
              mealPosition: mealPosition,
              previousScreen: "MealAction",
            })
          }
        >
          <Text style={styles.buttonText}>Supprimer le repas</Text>
        </TouchableOpacity>

        {/* go back to home */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Home", {
              dayId: dayId,
              mealId: mealId,
              mealPosition: mealPosition,
              previousScreen: "MealAction",
            })
          }
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(173, 216, 230)",
    alignItems: "center",
    paddingTop: 40, // فاصله از بالای صفحه برای قرارگیری لوگو
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 5,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#7b4fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
    width: "90%", // عرض دکمه
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
