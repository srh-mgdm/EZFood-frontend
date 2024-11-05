import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { selectMeal } from "../reducers/meals";
import images from "../assets/mealImages";

const DayCard = ({ day, navigation }) => {
  const dispatch = useDispatch();

  // console.log("Day params =>", day.meals);

  const handleMealDetail = (meal, mealPosition) => {
    navigation.navigate("MealAction", {
      dayId: day._id,
      mealId: meal.mealId,
      mealPosition,
      mealImage: meal.mealImage,
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
                    {meal.mealImage && (
                      <Image
                        source={
                          images[meal.mealImage] ||
                          require("../assets/default_image.png")
                        }
                        style={styles.mealImage}
                      />
                    )}
                  </TouchableOpacity>
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
                        mealImage,
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
    marginVertical: 10,
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
    flex: 1,
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
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  mealContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Allow the content to take available space
  },
  mealText: {
    color: "#555",
    fontSize: 16,
  },
  mealImage: {
    width: 24,
    height: 24,
    marginLeft: 10,
    borderRadius: 4, // Optional: Rounded corners for a consistent look
  },
});

export default DayCard;
