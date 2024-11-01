import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setMeals, selectMeal } from "../reducers/meals";

// receiving `navigation` as a prop for navigation functionality
export default function SearchScreen({ navigation, route }) {
  const [searchText, setSearchText] = useState(""); // Initialize searchText state for search input text
  const meals = useSelector((state) => state.meals.value.meals); // Access the list of meals(searched from user or guest) from Redux to show in FlatList
  const token = useSelector((state) => state.user.value.token); // Check if user is logged in (token exists)
  const dispatch = useDispatch();

  // console.log("Search screen route params =>", route.params);

  useEffect(() => {
    if (searchText.length > 4) {
      fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/meals/name/${searchText}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(setMeals(data.meals)); // Save fetched meals to Redux store
          } else {
            console.error("No meals found matching the search criteria");
          }
        })
        .catch((error) => console.error("Error fetching meals:", error));
    } else {
      dispatch(setMeals([])); // Clear meals list in Redux if search text is empty
    }
  }, [searchText]);

  const handleSelectMeal = (meal) => {
    dispatch(selectMeal(meal._id));
    setSearchText(meal.mealName); // fill input with the mealName

    // Navigate after updating the input
    setTimeout(() => {
      navigation.navigate("MealDetailScreen", {
        dayId: route.params.dayId,
        mealId: meal._id,
        mealPosition: route.params.mealPosition,
        previousScreen: "SearchMeal",
      });
    }, 100); // delay 100ms for update the input
  };

  const handleCreateMeal = () => {
    if (token) {
      navigation.navigate("CreateMealScreen"); // Allow logged-in users to create a meal
    } else {
      Alert.alert("Vous devez être connecté pour créer un repas");
    }
  };

  const handleGoHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.background}>
      {/* KeyboardAvoidingView to adjust screen layout when the keyboard is open */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.logoContainer}>
          <Image source={require("../assets/EZFood.png")} style={styles.logo} />
        </View>

        {/* Search bar container */}
        <View style={styles.searchContainer}>
          <FontAwesome
            name='search'
            size={24}
            color='#4A4A4A'
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder='Rechercher'
            placeholderTextColor='#4A4A4A'
            value={searchText}
            onChangeText={(text) => setSearchText(text)} // Update searchText state when text changes
          />
        </View>

        {/* Display filtered search results below search bar */}
        {searchText.length > 4 && (
          <FlatList
            data={meals}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelectMeal(item)}
              >
                {/* Each item in the list */}
                <Text style={styles.resultText}>{item.mealName}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noResultText}>Aucun repas trouvé</Text>
            }
            keyExtractor={(item) => item._id.toString()} // Unique key for each item
          />
        )}

        {/* Button at the bottom of the screen to create a new meal */}
        <Pressable
          style={[styles.createButton, { opacity: token ? 1 : 0.5 }]}
          onPress={handleCreateMeal}
        >
          <Text style={styles.createButtonText}>Créer un repas</Text>
        </Pressable>

        {/* button for return to page Home */}
        <Pressable style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background image takes up the entire screen
    resizeMode: "cover", // Adjusts background to cover the entire screen
    backgroundColor: "rgb(173, 216, 230)",
  },
  container: {
    flex: 1, // Allows for full screen usage
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 0,
    marginTop: -60,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: -100,
  },
  searchContainer: {
    flexDirection: "row", // Row layout for search icon and input
    alignItems: "center", // Center icon and text vertically
    backgroundColor: "#F0F0F0", // Light grey background for the search bar
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10, // Space between icon and input
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  resultItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    backgroundColor: "rgba(70, 130, 180, 0.6)", // Semi-transparent background
    borderRadius: 5,
    marginVertical: 5, // Margin between items
  },
  resultText: {
    color: "#000",
    fontWeight: "bold",
  },
  noResultText: {
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
    padding: 10,
  },
  createButton: {
    backgroundColor: "#7b4fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10, // Vertical margin around the button
    alignSelf: "center",
    width: "90%", // Button width
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#7b4fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    width: "90%",
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
