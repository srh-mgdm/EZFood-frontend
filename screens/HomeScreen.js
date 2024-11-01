import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import DayCard from "../components/dayCard";
import { setDays } from "../reducers/days";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  // Get user token and days from Redux store
  const userToken = useSelector((state) => state.user.value.token);
  const days = useSelector((state) => state.days.value || []);

  console.log("Days =>", days);
  console.log("User Token =>", userToken);

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
            console.log("Fetched days:", data.days);
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
            dayId: "guestDayTemplate1",
            dayName: "Jour 1",
            dayNumber: 1,
            meals: [
              { mealId: null, mealName: null },
              { mealId: null, mealName: null },
            ],
          },
          {
            dayId: "guestDayTemplate2",
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

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Header navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        {days.map((day) => (
          <DayCard
            key={day.dayId}
            // dayId={day.dayId}
            day={day}
            navigation={navigation}
          />
        ))}
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
    paddingHorizontal: "5%",
  },
});
