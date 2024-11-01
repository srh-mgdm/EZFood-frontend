import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useuy } from "react-redux";
import { useState } from "react";
import { deleteMealFromDay } from "../reducers/days";
import { selectMeal } from "../reducers/meals";

const DayCard = ({ day, navigation }) => {
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false);
  const userToken = useSelector((state) => state.user.value.token);

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

        console.log("Meal removed from day in db:", data);
        console.log("Meal to remove from redux store:", {
          dayId,
          mealPosition,
        });

        // Dispatch action to remove meal from store
        dispatch(deleteMealFromDay({ dayId, mealPosition }));
        // setRefresh(!refresh); // Trigger a refresh of the screen
      })
      .catch((error) => console.error("Error deleting meal:", error));
  };

  const handleMealDetail = (meal) => {
    //   navigation.navigate("MealDetailScreen", {
    //   // mealId: meal.mealId,
    //   // mealPosition: mealPosition,
    //   previousScreen: "HomeScreen",
    // })
    dispatch(selectMeal(meal.mealId))
    console.log(meal.mealId)
    console.log(day.dayId)
    
  }

  return (
    <View style={styles.dayCard}>
      <Text style={styles.dayName}>{day.dayName}</Text>
      <View style={styles.mealsContainer}>
        {day.meals.map((meal, mealPosition) => (
          <View key={mealPosition} style={styles.meal}>
            {meal.mealId ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    handleMealDetail(meal)
                  }
                >
                  <Text style={styles.mealText}>{meal.mealName}</Text>
                </TouchableOpacity>
                <FontAwesome
                  name='trash-o'
                  size={24}
                  color='red'
                  onPress={() => handleRemoveMeal(day._id, mealPosition)}
                />
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SearchMeal", {
                      dayId: day.dayId,
                      mealPosition,
                    })
                  }
                >
                  <Text style={styles.mealText}>Ajouter un repas</Text>
                </TouchableOpacity>
                <FontAwesome
                  name='plus'
                  size={24}
                  color='#7b4fff'
                  onPress={() =>
                    navigation.navigate("SearchMeal", {
                      dayId: day.dayId,
                      mealPosition,
                    })
                  }
                />
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dayName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  mealsContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  meal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  mealText: {
    color: "#555",
    fontSize: 18,
  },
});

export default DayCard;
