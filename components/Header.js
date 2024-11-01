import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

export const Header = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.username);

  // Define the icon based on the user's login status
  const icon = user ? (
    <FontAwesome
      name='sign-out'
      size={30}
      color='white'
      onPress={() => {
        dispatch(logout()); // Clear the user from Redux store
        // navigation.replace("HomeScreen"); // Redirect to HomeScreen
      }}
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
      <Text style={[styles.textHead, styles.foregroundColor]}>EZ FOOD</Text>
      <View style={styles.rightSide}>
        <Text style={[styles.foregroundColor, styles.userName]}>
          {user || "Invité"}
        </Text>
        {icon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#7b4fff",
  },
  foregroundColor: {
    color: "white",
  },
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    paddingRight: 10,
  },
  textHead: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
