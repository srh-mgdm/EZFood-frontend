import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { selectMeal } from "../reducers/meals";

const DayCard = ({ day, navigation }) => {
  const dispatch = useDispatch();

  const handleMealDetail = (meal, mealPosition) => {
    navigation.navigate("MealAction", {
      dayId: day._id,
      mealId: meal.mealId,
      mealPosition,
      previousScreen: "Home",
    });
    dispatch(selectMeal(meal.mealId));
  };

  return (
    <View style={styles.dayCard}>
      <Text style={styles.dayName}>{day.dayName}</Text>
      <View style={styles.mealsContainer}>
        {day.meals.map((meal, mealPosition) => (
          <>
            <View key={mealPosition} style={styles.meal}>
              {meal.mealId ? (
                <>
                  <TouchableOpacity
                    onPress={() => handleMealDetail(meal, mealPosition)}
                  >
                    <Text style={styles.mealText}>{meal.mealName}</Text>
                  </TouchableOpacity>
                  {/* <FontAwesome
                    name='trash-o'
                    size={24}
                    color='red'
                    onPress={() => handleRemoveMeal(day._id, mealPosition)}
                  /> */}
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SearchMeal", {
                        dayId: day._id,
                        mealPosition,
                        previousScreen: "Home",
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
                        dayId: day._id,
                        mealPosition,
                        previousScreen: "Home",
                      })
                    }
                  />
                </>
              )}
            </View>
            {mealPosition < day.meals.length - 1 && (
              <View style={styles.separator} />
            )}
          </>
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
    marginVertical: 20, // من
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: 200,
  },
  dayName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  mealsContainer: {
    flex: 1, // Ensure it takes the available space within the card
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "stretch",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  meal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: "#eee",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  mealText: {
    color: "#555",
    fontSize: 16, // Slightly reduced for more content to fit within the card
  },
});

export default DayCard;
