import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Reducers
// import { addMeal, deleteMeal } from "../reducers/meal";
import { setDays } from "../reducers/days";

export const DayCard = ({ navigation }) => {
  const dispatch = useDispatch();

  // Redux Store data
  const user = useSelector((state) => state.user.value.token);
  const days = useSelector((state) => state.days.value || []);

  // State data
  //   const [meal, setMeal] = useState(null);
  console.log("Days =>", days);

  const weekDays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  useEffect(() => {
    if (user) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/days`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(setDays(data.days));
          }
        })
        .catch((error) => {
          console.log("Cannot fetch days :", error);
        });
    } else {
      //   navigation.navigate("Login");
    }
  }, [user]);

  const handleRemoveMealFromDay = (dayId, mealIndex) => {
    console.log("handleRemoveMealFromDay", dayId, mealIndex);
    // dispatch(deleteMeal({ dayId, mealIndex }));
  };

  const renderMeal = (meal, onRemove) => (
    <View style={styles.meal}>
      <Text style={styles.mealText}>{meal}</Text>
      <FontAwesome
        name='trash-o'
        size={24}
        color='red'
        onPress={handleRemoveMealFromDay}
      />
    </View>
  );

  const renderDayCard = (day, index) => (
    <View key={index} style={styles.dayCard}>
      <Text style={[styles.foregroundColor, styles.dayName]}>
        {day.dayName || day}
      </Text>
      <View style={[styles.mealsContainer, styles.backgroundColor]}>
        {day.meals?.map((meal, i) =>
          renderMeal(meal.mealName, () => dispatch(deleteMeal(meal.mealId, i)))
        )}
        {!day.meals && (
          <>
            {["Ajouter un repas", "Ajouter un repas"].map((label) => (
              <View style={styles.meal} key={label}>
                <Text style={styles.foregroundColor}>{label}</Text>
                <FontAwesome
                  name='plus'
                  size={30}
                  color='white'
                  onPress={() => navigation.navigate("SearchMeal")}
                />
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.dayCardContainer}>
      {(days.length ? days : weekDays).map(renderDayCard)}
    </View>
  );
};

const styles = StyleSheet.create({
  dayCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
  },
  dayCard: {
    width: "48%", // less than half width
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  dayName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "center", // centers day name
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
  color: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  background: {
    backgroundColor: "#7b4fff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  backgroundColor: {
    backgroundColor: "#f9f9f9",
  },
  foregroundColor: {
    color: "#333",
  },
});
