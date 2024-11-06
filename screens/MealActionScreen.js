import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteMealFromDay } from "../reducers/days";

export default function MealScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { mealId, dayId, mealPosition, mealImage, mealName, previousScreen } =
    route.params;
  const userToken = useSelector((state) => state.user.value.token);

  // console.log("action screen params : ", route.params);

  const handleRemoveMeal = (dayId, mealPosition) => {
    // Call backend to delete the meal from the database
    // it is done by updating (PUT route) the meals array at the given position
    if (userToken) {
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
        })
        .catch((error) => console.error("Error deleting meal:", error));
    } else {
      // No user token, only update redex store for guest user
      dispatch(deleteMealFromDay({ dayId, mealPosition }));
    }

    // Go back to previous screen
    navigation.navigate(previousScreen, {
      dayId: dayId,
      mealId: mealId,
      mealPosition: mealPosition,
      mealImage: mealImage,
      previousScreen: "MealAction",
    });
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/EZFood_2.png")} style={styles.logo} /> */}

    <Text style={styles.mealName}>{mealName}</Text>

    <Image source={{ uri: mealImage }} style={styles.logo} />

      {/* check meal detail by going to the MealDetail screen */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("MealDetailScreen", {
              dayId: dayId,
              mealId: mealId,
              mealPosition: mealPosition,
              mealImage: mealImage,
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
              mealImage: mealImage,
              previousScreen: "MealAction",
            })
          }
        >
          <Text style={styles.buttonText}>Changer le repas</Text>
        </TouchableOpacity>

        {/* remove the selected meal from the selected day */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRemoveMeal(dayId, mealPosition)}
        >
          <Text style={styles.buttonText}>Supprimer le repas</Text>
        </TouchableOpacity>

        {/* go back to home */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
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
    paddingTop: 40,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 5,
    marginTop: 30,
    borderRadius: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: "#7b4fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
    width: "90%",
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
  mealName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 100,
    textAlign: "center",
    color: "#7b4fff",
  },

});
