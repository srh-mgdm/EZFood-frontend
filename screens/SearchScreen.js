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
import { useSelector } from "react-redux";
// import images from "../assets/mealImages"; // Import images from separate module

// receiving `navigation` as a prop for navigation functionality
export default function SearchScreen({ navigation, route }) {
  //`navigation` is used for navigating between screens, and `route` is used to receive parameters passed to this screen.
  const [searchText, setSearchText] = useState(""); // Initialize searchText state for search input text
  const [meals, setMeals] = useState([]); // Store  the searched meals locally
  const token = useSelector((state) => state.user.value.token); // Check if user is logged-in (token exists)

  //   console.log("Search screen route params =>", route.params); //{"dayId": "6724e4477622d1eba6943237", "mealPosition": 0, "previousScreen": "Home"}
  useEffect(() => {
    let endpoint = `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/meals/name/${searchText}`;

    if (searchText.length > 0) {
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setMeals(data.meals); //Store meals in local state.
          } else {
            console.error("No meals found matching the search criteria");
          }
        })
        .catch((error) => console.error("Error fetching meals:", error));
    } else {
      setMeals([]); // clear meals list if search text is lower than 5 character
    }
  }, [searchText]);

  const handleSelectMeal = (meal) => {
    setSearchText(meal.mealName); // fill input with the mealName

    // Navigate after updating the input
    setTimeout(() => {
      if (route.params) {
        navigation.navigate("MealDetailScreen", {
          dayId: route.params.dayId,
          mealId: meal._id,
          mealPosition: route.params.mealPosition,
          mealImage: meal.mealImage, //من
          previousScreen: "SearchMeal",
        });
      }
    }, 100); // delay 100ms for update the input
  };

  const handleCreateMeal = () => {
    if (token) {
      //   navigation.navigate("CreateMealScreen"); // Allow logged-in users to create a meal
      Alert.alert("Fonctionnalité en développement");
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
          <Image source={require("../assets/EZFood_2.png")} style={styles.logo} />
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
        {searchText.length > 0 && (
          <FlatList
            data={meals}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleSelectMeal(item)}
                >
                  {/* Each item in the list */}
                  <View style={styles.row}>
                    <Image
                      source={{ uri: item.mealImage || "https://res.cloudinary.com/dr5mo6tor/image/upload/v1730715667/default_image_htwtfq.png" }}
                      style={styles.mealImage}
                    />
                    <Text style={styles.resultText}>{item.mealName}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.noResultText}>Aucun repas trouvé</Text>
            }
            keyExtractor={(item) => item._id.toString()} // Unique key for each item
          />
        )}

        {/* Button at the bottom of the screen to create a new meal */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.createButton,
              { backgroundColor: token ? "#7b4fff" : "#A9A9A9" },
            ]}
            A9A9A9
            onPress={handleCreateMeal}
          >
            <Text style={styles.createButtonText}>Créer un repas</Text>
          </Pressable>

          <Pressable style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
          </Pressable>
        </View>
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
    marginBottom: -95,
    marginTop: -20,
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
  buttonContainer: {
    flexDirection: "row", // put bottoms in a row
    justifyContent: "space-between",
    padding: 20,
    // position: "absolute", // fixe the button positions in the bottom
    bottom: 10,
    left: 0,
    right: 0,
    // backgroundColor: "rgb(173, 216, 230)",
  },
  createButton: {
    backgroundColor: "#7b4fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#7b4fff",
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "cover",
  },
});
