// import React from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

// export default function MealScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/EZFood.png")} style={styles.logo} />

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("MealDetailScreen")}
//         >
//           <Text style={styles.buttonText}>Voir les détails</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("SearchMeal")}
//         >
//           <Text style={styles.buttonText}>Changer le repas</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Supprimer le repas</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "rgb(173, 216, 230)",
//     alignItems: "center",
//     paddingTop: 40, // فاصله از بالای صفحه برای قرارگیری لوگو
//   },
//   logo: {
//     width: 400,
//     height: 400,
//     marginBottom: 0, // حداقل فاصله بین لوگو و دکمه‌ها
//   },
//   buttonContainer: {
//     width: "100%",
//     alignItems: "center",
//     marginTop: -50, // تنظیم فاصله منفی برای نزدیک‌تر کردن دکمه‌ها به لوگو
//   },
//   button: {
//     width: "80%",
//     padding: 15,
//     borderRadius: 25,
//     alignItems: "center",
//     marginVertical: 5, // فاصله عمودی بین دکمه‌ها
//     backgroundColor: "#0077b6",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function MealScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/EZFood.png")} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MealDetailScreen")}
        >
          <Text style={styles.buttonText}>Voir les détails</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SearchMeal")}
        >
          <Text style={styles.buttonText}>Changer le repas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Supprimer le repas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(173, 216, 230)",
    alignItems: "center",
    paddingTop: 40, // فاصله از بالای صفحه برای قرارگیری لوگو
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 5, // حداقل فاصله بین لوگو و دکمه‌ها
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: -50, // تنظیم فاصله منفی برای نزدیک‌تر کردن دکمه‌ها به لوگو
  },
  button: {
    backgroundColor: "#7b4fff", // رنگ دکمه مشابه دکمه‌های SearchScreen
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
    width: "90%", // عرض دکمه
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
