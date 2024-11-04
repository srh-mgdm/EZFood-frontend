import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMealToDay } from "../reducers/days";

const { height } = Dimensions.get("window");

export default function MealDetailScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.value.token);
  const [meal, setMeal] = useState({});
  const { mealId, dayId, mealPosition, previousScreen } = route.params;

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/meals/${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMeal(data.meal);
        }
      })
      .catch((error) => {
        console.log("Cannot fetch meal:", error);
      });
  }, [mealId]);

  const handleValidate = () => {
    if (userToken) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/days/meal`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ dayId, mealId, mealPosition }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.result) {
            console.error("Error updating day with meal:", data.error);
            return;
          }
          dispatch(
            addMealToDay({
              dayId,
              mealId,
              mealName: meal.mealName,
              mealPosition,
            })
          );
          navigation.navigate("Home");
        });
    } else {
      dispatch(
        addMealToDay({ dayId, mealId, mealName: meal.mealName, mealPosition })
      );
      navigation.navigate("Home");
    }
  };

  const ingredients = meal.mealIngredients?.map((data, i) => (
    <View key={i} style={styles.ingredientItem}>
      <Text style={styles.ingredientText}>{data.ingredientId.name}</Text>
      <Text style={styles.quantityText}>{`${data.quantity} ${
        data.unit ? data.unit : ""
      }`}</Text>
    </View>
  ));

  const steps = meal.mealPrepSteps?.map((data, i) => (
    <Text key={i} style={styles.stepText}>
      {`${data.stepNumber}. ${data.stepDescription}`}
    </Text>
  ));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mealName} numberOfLines={2}>
          {meal.mealName}
        </Text>
        <TouchableOpacity style={styles.editIcon} disabled>
          <FontAwesome name='pencil' size={25} color='#7b4fff' />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingrédients</Text>
        <ScrollView
          contentContainerStyle={styles.ingredientsContent}
          style={styles.ingredientsContainer}
        >
          {ingredients}
        </ScrollView>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <FontAwesome name='hourglass' size={20} color='#7b4fff' />
          <Text style={styles.infoText}>{`${meal.mealPrepTime} min`}</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name='cutlery' size={20} color='#7b4fff' />
          <Text style={styles.infoText}>
            {`${meal.mealServings} ${
              meal.mealServings > 1 ? "couverts" : "couvert"
            }`}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préparation</Text>
        <ScrollView
          contentContainerStyle={styles.stepsContent}
          style={styles.stepsContainer}
        >
          {steps}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate(previousScreen, {
              dayId: dayId,
              mealId: mealId,
              mealPosition: mealPosition,
              previousScreen: "MealDetailScreen",
            })
          }
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleValidate}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  header: {
    backgroundColor: "rgb(173, 216, 230)",
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
    position: "relative",
  },
  mealName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#7b4fff",
    textAlign: "center",
  },
  editIcon: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  ingredientsContainer: {
    maxHeight: height * 0.35, // Reduced to show less height
    borderRadius: 12,
  },
  ingredientsContent: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
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
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  infoItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  stepsContainer: {
    maxHeight: height * 0.35, // Limited height for visibility
    backgroundColor: "#f7f7f7", // Different background color
    borderRadius: 12,
  },
  stepsContent: {
    padding: 15,
    paddingBottom: 80, // Space for buttons
  },
  stepText: {
    fontSize: 16,
    color: "#555",
    paddingVertical: 8,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f0f8ff",
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
