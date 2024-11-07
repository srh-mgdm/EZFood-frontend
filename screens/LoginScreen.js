import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user"; // Import the login action from user reducer
import { deleteDays } from "../reducers/days";
import { Alert } from "react-native";

// useState to manage form mode (connection or registeration) and input values
export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true); //Tracks if user is in login mode (true) or signup mode (false)
  const [email, setEmail] = useState(""); // Stores the email input
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Stores the username input (only for signup)
  const [retypePassword, setRetypePassword] = useState(""); // Stores the re-entered password (only for signup)

  const dispatch = useDispatch();

  // Regular expression for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle login or signup
  const handlePress = () => {
    // Check if email format is valid
    if (!emailPattern.test(email)) {
      Alert.alert("Adresse e-mail invalide");
      return;
    }
    const url = `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/${
      isLogin ? "signin" : "signup"
    }`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        isLogin
          ? { email:email.toLowerCase(), password } // Directly send login data
          : { username, email:email.toLowerCase(), password, retypePassword } // Directly send signup data
      ),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Delete all days from redux store
          // Necessary when going from guest to login
          // so that days input while guest are not carried over to logged user
          dispatch(deleteDays());

          // Dispatch login action with token and username directly from server response
          dispatch(login({ token: data.token, username: data.username }));
          Alert.alert(
            "Succès !",
            isLogin ? "Connexion réussie !" : "Enregistrement réussi !"
          );

          navigation.navigate("Home");
          // Reset form fields after successful action
          setEmail("");
          setPassword("");
          setUsername("");
          setRetypePassword("");
        } else {
          Alert.alert("Erreur", data.error); // Display error message from server
        }
      })
      .catch((error) => {
        Alert.alert("Erreur réseau", "Failed to connect to server"); // Handle network errors
      });
  };

  return (
    // <ImageBackground
    //   source={require("../assets/background2.jpg")}
    //   style={styles.background}
    //   resizeMode='cover'
    // >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} //Adjusts layout for keyboard on iOS and Android
    >
      <View style={styles.form}>
        {/* add logo */}
        <Image source={require("../assets/EZFood_1.png")} style={styles.logo} />
        {/* Form title changes based on the mode Connection ou register */}
        <Text style={styles.title}>
          {isLogin ? "Connexion" : "Inscription"}
        </Text>

        {/* Username input for signup mode only */}
        {!isLogin && (
          <View style={styles.inputContainer}>
            <FontAwesome name='user' size={20} color='#7b4fff' />
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={username}
              autoCapitalize='none'
              onChangeText={setUsername} // Updates username state on change
            />
          </View>
        )}

        {/* Email input, shown in both login and signup modes */}
        <View style={styles.inputContainer}>
          {/* Email icon */}
          <FontAwesome name='envelope' size={20} color='#7b4fff' />
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            autoCapitalize="none" //avoid to put majuscule letters
            onChangeText={(text) => setEmail(text.toLowerCase())} // Updates username state on change and transform to minuscule letters
          />
        </View>

        {/* Password input, shown in both login and signup modes */}
        <View style={styles.inputContainer}>
          {/* Password icon */}
          <FontAwesome name='lock' size={20} color='#7b4fff' />
          <TextInput
            style={styles.input}
            placeholder='Mot de passe'
            secureTextEntry
            value={password}
            autoCapitalize="none"
            onChangeText={setPassword} // Updates password state on change
          />
        </View>

        {/* Re-enter password input for signup mode only */}
        {!isLogin && (
          <View style={styles.inputContainer}>
            {/* Re-enter password icon */}
            <FontAwesome name='lock' size={20} color='#7b4fff' />
            <TextInput
              style={styles.input}
              placeholder='Réécrire Mot de passe'
              secureTextEntry
              value={retypePassword}
              onChangeText={setRetypePassword} // Updates retypePassword state on change
            />
          </View>
        )}

        {/* Submit button for login or signup */}
        <Pressable style={styles.button} onPress={handlePress}>
          {/* Button text changes based on mode */}
          <Text style={styles.buttonText}>
            {isLogin ? "Se connecter" : "Inscription"}
          </Text>
        </Pressable>

        {/* Toggles between login and signup modes */}
        <Text style={styles.switchText}>
          {isLogin ? "Nouveau utilisateur? " : "Déjà un compte ? "}
          <Text style={styles.link} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? "Créer un compte" : "Connectez-vous"}
          </Text>
        </Text>
        {/* Line separator with "ou" */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>ou</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Guest login option */}

        <Pressable
          style={styles.guestButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>
            Continuez-vous en tant qu'invité
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgb(173, 216, 230)",
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(173, 216, 230)",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: -80,
  },
  form: {
    width: "80%",
    paddingBottom: 30,
    paddingHorizontal: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7b4fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#7b4fff",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 15,
    fontSize: 14,
  },
  link: {
    color: "#7b4fff",
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  guestText: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  guestButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#7b4fff",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
});
