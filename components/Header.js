import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

export const Header = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.username);

    // Capitalize the first letter of the username
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


   // Define logout confirmation
   const confirmLogout = () => {
    Alert.alert(
      "Déconnexion", // Title of the alert
      "Êtes-vous sûr de vouloir vous déconnecter ?", // Message of the alert
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            dispatch(logout()); // Clear the user from Redux store
            navigation.replace("Home"); // Redirect to HomeScreen
          },
        },
      ],
      { cancelable: true } // The option to close the alert by tapping outside the window( only works in android)
    );
  };

  // Define the icon based on the user's login status
  const icon = user ? (
    <FontAwesome
      name='sign-out'
      size={30}
      color='white'
      onPress={confirmLogout} // Call the logout confirmation function when the icon is pressed
    />
  ) : (
    <FontAwesome
      name='user'
      size={30}
      color='white'
      onPress={() => navigation.navigate("Login")}
    />
  );

  return (
    <View style={[styles.header, styles.background]}>
        <Image source={require("../assets/EZFood_2.png")} style={styles.logo}/>

      <View style={styles.rightSide}>
        <Text style={[styles.foregroundColor, styles.userName]}>
        {user ? capitalize(user) : "Invité"}
        </Text>
        {icon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#8a6fff",
        borderRadius: 20, // Full corner radius for all sides
        marginTop: 5, // Space from the top
        shadowColor: "#000", // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Slightly offset for shadow all around
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 6, // Shadow blur radius
        elevation: 10, // Elevation for Android
        // right:-10,
        // left:4,

      },
  foregroundColor: {
    color: "white",
  },
  header: {
    width: "100%",
    height: 65,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "8%",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    paddingRight: 20,
  },
  logo: {
    width: 300, // Adjust the width of the logo
    height: 100,  // Adjust the height of the logo
    resizeMode: "contain",
    marginLeft: -80,
    marginTop: 20,
    marginLeft: -120,
    marginTop: 20,
  },
});
