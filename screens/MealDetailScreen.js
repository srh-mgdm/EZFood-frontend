import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMealToDay } from "../reducers/days";

export default function MealDetailScreen({ navigation, route }) {
  const dispatch = useDispatch();

  // Get user token
  const userToken = useSelector((state) => state.user.value.token);

  // const meal = useSelector(
  //   (state) => state.meals.value.selectedMealDetails || []
  // );
  // const mealId = useSelector((state) => state.meals.value.selectedMeal || []);

  const [meal, setMeal] = useState({});

  console.log("Meal Detail screen route params =>", route.params);

  const mealId = route.params.mealId;
  const dayId = route.params.dayId;
  const mealPosition = route.params.mealPosition;

  useEffect(() => {
    //fetch route meal par mealId
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/meals/${mealId}`) //flatMealId
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMeal(data.meal);
          // dispatch(selectMealDetail(data.meal)); //placer dans la valeur dans le reducer selectedMeal
        }
      })
      .catch((error) => {
        console.log("Cannot fetch meals :", error);
      });
  }, [mealId]);

  const handleValidate = () => {
    console.log(
      "validate with dayId, mealId, mealPosition : ",
      dayId,
      mealId,
      meal.mealName,
      mealPosition
    );

    // If user is logged then we add the meal to the day in the database first
    if (userToken) {
      // Handle adding a meal to the corresponding day
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/days/meal`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          dayId: dayId,
          mealId: mealId,
          // mealName: meal.mealName,
          mealPosition: mealPosition,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.result) {
            console.error("Error updating day with meal:", data.error);
            return;
          }
          console.log("Meal added to day successfully");
          // Dispatch action to add meal to store
          dispatch(
            addMealToDay({
              dayId,
              mealId,
              mealName: meal.mealName,
              mealPosition,
            })
          );
          // Go back to home screen
          navigation.navigate("Home");
        });
    } else {
      // If user is not logged in, we just add the meal to the store

      // Dispatch action to add meal to store
      dispatch(
        addMealToDay({ dayId, mealId, mealName: meal.mealName, mealPosition })
      );
      // Go back to home screen
      navigation.navigate("Home");
    }
  };

  const ingredients = meal.mealIngredients?.map((data, i) => (
    <View key={i} style={styles.ing}>
      <Text style={styles.list}>
        {i + 1}. {data.ingredientId.name}
      </Text>
      <Text style={styles.qt}>
        {data.quantity} {data.unit}
      </Text>
    </View>
  ));

  const steps = meal.mealPrepSteps?.map((data, j) => (
    <View key={j} style={styles.az}>
      <Text style={styles.list}>
        {" "}
        {data.stepNumber}. {data.stepDescription}
      </Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <ImageBackground
          source={require("../assets/background2.jpg")}
          resizeMode='cover'
          style={styles.image}
        >
          <Text style={styles.color}> {meal.mealName} </Text>
          <FontAwesome
            name='pencil'
            size={40}
            color='white'
            onPress={() => navigation.navigate("Home")}
          />
          {/* Faire la navigation vers la page edit */}
        </ImageBackground>
      </View>

      <View style={styles.ingredient}>
        <ScrollView style={styles.boxIng}>{ingredients}</ScrollView>
      </View>

      <View style={styles.infos}>
        <View style={styles.info}>
          <FontAwesome name='hourglass' size={20} color='white' />
          <Text style={styles.infoBox}> {meal.mealPrepTime} min </Text>
        </View>
        <View style={styles.info}>
          <FontAwesome name='spoon' size={20} color='black' />
          <Text style={styles.infoBox}>
            {" "}
            {meal.mealServings}{" "}
            {meal.mealServings > 1 ? "personnes" : "personne"}{" "}
          </Text>
        </View>
      </View>

      <View style={styles.recipe}>
        <ScrollView style={styles.boxRec}>{steps}</ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Home")}
          title='Go back from MealDetail'
        >
          <Text style={styles.color}>ANNULER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => handleValidate()}>
          <Text style={styles.color}>VALIDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {},

  color: {
    color: "white",
    fontSize: 20,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "lightblue",
  },

  head: {
    height: 100,
    width: "100%",
  },

  image: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  ingredient: {
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxIng: {
    width: "90%",
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "white",
  },

  ing: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  list: {
    fontSize: 20,
  },

  qt: {
    fontSize: 20,
  },

  infos: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  info: {
    height: 60,
    width: 120,
    borderRadius: 30,
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoBox: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
  },

  recipe: {
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxRec: {
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 10,
    marginBottom: 30,
    height: "90%",
    width: "90%",
    marginTop: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "white",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  btn: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    padding: 10,
    backgroundColor: "purple",
  },
});
