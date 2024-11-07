import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import DayCard from "../components/dayCard";
import { setDays } from "../reducers/days";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  // Get user token and days from Redux store
  const userToken = useSelector((state) => state.user.value.token);
  const days = useSelector((state) => state.days.value || []);
  const [forceRefresh, setForceRefresh] = useState(false);

  // Fetch days when the component mounts
  useEffect(() => {
    if (userToken) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/days`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            // console.log("Fetched days:", data.days);
            dispatch(setDays(data.days));
          }
        })
        .catch((error) => console.error("Cannot fetch days:", error));
    } else {
      // No user token,
      console.log("User not authenticated / guest user");
      dispatch(setDays([]));
    }
  }, [userToken, forceRefresh]);

  /**
   * Create a new day, either by sending a POST request to the backend,
   * or by just updating the Redux store when there is no user token.
   * When the request is successful, update the Redux store with the new day
   * and new meals.
   */
  const handleAddDay = () => {
    const newDay = {
      dayNumber: parseInt(days.length) + 1,
      dayName: "Jour " + parseInt(days.length + 1),
      mealsId: [null, null],
    };

    if (userToken) {
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/days`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDay),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            // console.log("New day created:", data.day);
            dispatch(
              setDays([
                ...days,
                {
                  _id: data.day._id, // We just got that from the database
                  dayName: data.day.dayName,
                  dayNumber: data.day.dayNumber,
                  meals: [
                    { mealId: null, mealName: null, mealImage: null },
                    { mealId: null, mealName: null, mealImage: null },
                  ],
                },
              ])
            );
          }
        })
        .catch((error) => console.error("Cannot add new day:", error));
    } else {
      // update only redux store when there is no token (guest mode)
      dispatch(
        setDays([
          ...days,
          {
            _id: Number(days.length) + 1, // We just got that from the database
            dayNumber: parseInt(days.length) + 1,
            dayName: "Jour " + parseInt(days.length + 1),
            meals: [
              { mealId: null, mealName: null },
              { mealId: null, mealName: null },
            ],
          },
        ])
      );
    }
  };

  /**
   * Send an array of mealIds to the Ingredients screen, so that it can fetch the ingredients for those meals.
   *
   * This function is called when the user clicks on the "Liste des ingrédients" button.
   *
   * It loops through each day, and each meal in the day.
   * If the meal has a mealId, it adds it to the mealIds array.
   * Then, it navigates to the Ingredients screen, passing the mealIds array as a prop.
   */
  const handleIngredientsList = () => {
    navigation.navigate("Ingredients");
  };

  const handleFillExistingDays = () => {
    if (userToken) {
      fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/days/fillExistingDays`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.result) {
            console.error("Error filling existing days:", data.error);
            return;
          }
          // dispatch(setDays(days));
          setForceRefresh(!forceRefresh);
        })
        .catch((error) => console.error("Error filling existing days:", error));
    } else {
      Alert.alert(
        "Cette fonctionnalité est réservée aux utilisateurs connectés !"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Header navigation={navigation} />
      </View>

      <ScrollView contentContainerStyle={styles.main} style={styles.scrollView}>
        {Array.isArray(days) &&
          days.length > 0 &&
          days.map((day) => (
            <DayCard key={day._id} day={day} navigation={navigation} />
          ))}

        {/* Always a "new day" card at the end of the list */}
        <View
          style={[
            styles.sampleCard,
            { width: days.length > 0 ? "48%" : "100%" }, // Adjust width based on days array
          ]}
        >
          <TouchableOpacity onPress={handleAddDay} style={styles.iconContainer}>
            <Image
              source={require("../assets/plus.png")}
              style={styles.iconImage}
            />
            <Text style={styles.sampleText}>Ajouter une journée</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* gradient for smooth fade over the days */}
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
        style={styles.gradientOverlay}
      />

      {/* action buttons at the bottom of the screen */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleIngredientsList()}
        >
          <Text style={styles.buttonText}>Liste de courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleFillExistingDays()}
        >
          <Text style={styles.buttonText}>Proposer des repas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%", // safe area
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  head: {
    height: 100,
    width: "98%",
    padding: 5,
  },
  main: {
    flexGrow: 5,
    paddingBottom: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: "2%",
  },
  scrollView: {
    paddingBottom: 100,
  },
  sampleCard: {
    height: 200,
    backgroundColor: "#b3a3ff",
    borderRadius: 10,
    marginVertical: 10, // Match with DayCard margin
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  sampleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 60,
    height: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
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
