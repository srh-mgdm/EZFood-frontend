import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
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




  //console.log("Days in the store ok=>", days[0]);
  // days[0].meals[0].mealId
  // console.log('tablo',tab)

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
      dispatch(
        setDays([
          {
            _id: "guestDayTemplate1",
            dayName: "Jour 1",
            dayNumber: 1,
            meals: [
              { mealId: null, mealName: null },
              { mealId: null, mealName: null },
            ],
          },
          {
            _id: "guestDayTemplate2",
            dayName: "Jour 2",
            dayNumber: 2,
            meals: [
              { mealId: null, mealName: null },
              { mealId: null, mealName: null },
            ],
          },
        ])
      );
    }
  }, [userToken, dispatch]);

  // const handleIngredientsList = () => {
  //   const mealIds = [];
  //   // Boucle sur chaque jour
  //   days.forEach(day => {
  //     // Boucle sur chaque repas du jour
  //     day.meals.forEach(meal => {
  //       // Ajoute le mealId au tableau s'il existe 
  //       if (meal.mealId) { // && !mealIds.includes(meal.mealId)  ___et n'est pas déjà dans le tableau
  //         mealIds.push(meal.mealId);
  //       }
  //     });
  //   });
  //   navigation.navigate("Ingredients")
    
  // }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Header navigation={navigation} />
       
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        {Array.isArray(days) && days.length > 0 ? (
          days.map((day) => (
            <DayCard key={day._id} day={day} navigation={navigation} />
          ))
        ) : (
          <View style={styles.sampleCard}>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateDayScreen")}
            >
              <Text style={styles.sampleText}>Create a New Day</Text>
            </TouchableOpacity>
          </View>
        )}
         
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%", // safe area
  },
  head: {
    height: 50,
    width: "100%",
  },
  main: {
    flexGrow: 5,
    // paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: "2%",
  },
  sampleCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sampleText: { fontSize: 18, fontWeight: "600", color: "#333" },
});
