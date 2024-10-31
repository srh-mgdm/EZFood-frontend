import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addMeal, deleteMeal } from "../reducers/meal";

export const Card = ({ navigation }) => {
  const [meal, setMeal] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.token);
  const meals = useSelector((state) => state.meal.value || []);

  console.log("Meals =>", meals);

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
            dispatch(addMeal(data.days));
          }
        })
        .catch((error) => {
          console.log("Cannot fetch days :", error);
        });
    }
  }, [user]);

  const handleDelete = () => {};

  const week = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const card =
    meals.length > 0
      ? meals.map((data, i) => (
          <View key={i} style={styles.dayCard}>
            <Text style={[styles.foregroundColor, styles.dayName]}>
              {data.dayName}
            </Text>
            <View style={[styles.mealsContainer, styles.backgroundColor]}>
              <View style={styles.m}>
                <FontAwesome
                  name='trash-o'
                  size={30}
                  color='white'
                  onPress={() => dispatch(deleteMeal(i))}
                />
                <Text style={styles.color}> {data.meals[0].mealName} </Text>
              </View>

              <View style={[styles.meal, styles.background]}>
                <View style={styles.m}>
                  <FontAwesome
                    name='trash-o'
                    size={30}
                    color='white'
                    onPress={() => console.log("Hello")}
                  />
                  <Text style={styles.color}>{data.meals[1].mealName}</Text>
                </View>
              </View>
            </View>
          </View>
        ))
      : week.map((day, i) => (
          <View key={i} style={styles.dayCard}>
            <View style={[styles.meal, styles.background]}>
              <Text style={styles.day}>
                {day} - Jour {i + 1}
              </Text>
              <View style={styles.m}>
                <FontAwesome
                  name='plus'
                  size={30}
                  color='white'
                  onPress={() => navigation.navigate("SearchMeal")}
                />
                <Text style={styles.color}> ADD LUNCH </Text>
              </View>

              <View style={[styles.meal, styles.background]}>
                <Text style={styles.day}>
                  {day} - Jour {i + 1}
                </Text>
                <View style={styles.m}>
                  <FontAwesome
                    name='plus'
                    size={30}
                    color='white'
                    onPress={() => navigation.navigate("SearchMeal")}
                  />
                  <Text style={styles.color}>Add Dinner</Text>
                </View>
              </View>
            </View>
          </View>
        ));

  return <View style={styles.dayCardContainer}>{card}</View>;
};

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "#7b4fff",
  },
  foregroundColor: {
    color: "white",
  },
  dayCardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  dayCard: {
    height: 200,
    width: 180,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
  },
  mealsContainer: {
    height: "80%",
    width: "100%",
  },
  dayName: {
    height: "40%",
    width: "100%",
  },
});
