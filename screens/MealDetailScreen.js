import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMealToDay } from "../reducers/days";
import images from "../assets/mealImages"; // Import images from Cloudinary file

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
      <Image
          source={images[meal.mealImage] || images["default_image.png"]}
          style={styles.mealImage}
          resizeMode="cover"
        />
         <View style={styles.mealNameContainer}>
          <Text style={styles.mealName} numberOfLines={1}>
            {meal.mealName}
          </Text>
          <TouchableOpacity style={styles.editIcon} onPress={() => Alert.alert("Fonctionnalité en développement")}>
          <FontAwesome name='pencil' size={20} color='#1A237E' />
        </TouchableOpacity>
        </View>

      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <ScrollView contentContainerStyle={styles.sectionContent}>
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
        <Text style={styles.sectionTitle}>Preparation Steps</Text>
        <ScrollView contentContainerStyle={styles.sectionContent}>
          {steps}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            navigation.navigate(previousScreen, {
              dayId: dayId,
              mealId: mealId,
              mealPosition: mealPosition,
              previousScreen: "MealDetailScreen",
            })
          }
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.validateButton}
          onPress={handleValidate}
        >
          <Text style={styles.buttonText}>Validate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff", // Light background color for uniformity
  },
  header: {
    backgroundColor: "rgb(173, 216, 230)",
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 60, // Adjusted for more space from top
    alignItems: "center",
    position: "relative",
  },
  mealImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 0,
  },
  mealNameContainer: {
    position: "absolute",
    bottom: 5,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
     alignItems: "center"
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7b4fff",
    textAlign: "center",
    marginRight: 5,
  },
  editIcon: {
    // position: "absolute",
    // top: 60,
    // right: 20,
    marginLeft: 15,
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
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    borderColor: "#e0e0e0", // Border for subtle contrast
    borderWidth: 1,
    marginVertical: 10,
    paddingBottom: 15,
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
    backgroundColor: "#f0f8ff", // Matches container background
    paddingVertical: 15,
  },
  infoItem: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  stepText: {
    fontSize: 16,
    color: "#555",
    paddingVertical: 8,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  cancelButton: {
    backgroundColor: "rgb(173, 216, 230)",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  validateButton: {
    backgroundColor: "#7b4fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
