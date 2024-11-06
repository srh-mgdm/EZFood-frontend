import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { selectMeal } from "../reducers/meals";
// import images from "../assets/mealImages";

const DayCard = ({ day, navigation }) => {
  const dispatch = useDispatch();

  const handleMealDetail = (meal, mealPosition) => {
    navigation.navigate("MealAction", {
      dayId: day._id,
      mealId: meal.mealId,
      mealPosition,
      mealName: meal.mealName,
      mealImage: meal.mealImage,
      previousScreen: "Home",
    });
    dispatch(selectMeal(meal.mealId));
  };

  return (
    <View style={styles.dayCard}>
      <Text style={styles.dayName}>{day.dayName}</Text>
      <View style={styles.mealsContainer}>
        {day.meals.map((meal, mealPosition) => (
          <React.Fragment key={mealPosition}>
            <View style={styles.meal}>
              <TouchableOpacity
                onPress={() =>
                  meal.mealId
                    ? handleMealDetail(meal, mealPosition)
                    : navigation.navigate("SearchMeal", {
                        dayId: day._id,
                        mealPosition,
                        previousScreen: "Home",
                      })
                }
                style={styles.mealContent}
              >
                <Text style={styles.mealText} numberOfLines={2}>
                  {meal.mealId ? meal.mealName : "Ajouter un repas"}
                </Text>
                {meal.mealId && meal.mealImage ? (
                  <Image
                    source={{
                      uri:
                        meal.mealImage ||
                        "https://res.cloudinary.com/dr5mo6tor/image/upload/v1730715667/default_image_htwtfq.png",
                    }}
                    style={styles.mealImage}
                  />
                ) : (
                  <FontAwesome
                    name='plus'
                    size={24}
                    color='#064ead'
                    style={styles.plusIcon}
                  />
                )}
              </TouchableOpacity>
            </View>
            {mealPosition < day.meals.length - 1 && (
              <View style={styles.separator} />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10, // the same the same with marginVertical of style 's sampleCard
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: 200,
  },
  dayName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#064ead",
    marginBottom: 10,
    textAlign: "center",
  },
  mealsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  meal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  mealContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  mealText: {
    color: "#555",
    fontSize: 16,
    flexShrink: 1,
    marginRight: 10, // Adds spacing between text and icon/image
  },
  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 4, // Optional rounded corners
  },
  plusIcon: {
    alignSelf: "center",
  },
});

export default DayCard;
