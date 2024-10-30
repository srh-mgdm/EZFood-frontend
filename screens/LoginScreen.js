import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user'; // Import the login action from user reducer
import { Alert } from 'react-native';





// useState to manage form mode (connection or registeration) and input values
export default function LoginScreen({ navigation }) {

  const [isLogin, setIsLogin] = useState(true); //Tracks if user is in login mode (true) or signup mode (false)
  const [email, setEmail] = useState(''); // Stores the email input
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Stores the username input (only for signup)
  const [retypePassword, setRetypePassword] = useState(''); // Stores the re-entered password (only for signup)

  const dispatch = useDispatch();

   // Function to handle login or signup
   const handlePress = () => {
    const url = `${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/users/${isLogin ? 'signin' : 'signup'}`;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        isLogin
          ? { email, password } // Directly send login data
          : { username, email, password, retypePassword } // Directly send signup data
      ),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          // Dispatch login action with token and username directly from server response
          dispatch(login({ token: data.token, username: data.username}));
          Alert.alert('Success', isLogin ? 'Login successful!' : 'Signup successful!');

          navigation.navigate('Home');
          // Reset form fields after successful action
          setEmail('');
          setPassword('');
          setUsername('');
          setRetypePassword('');
        } else {
          Alert.alert('Error', data.error); // Display error message from server
        }
      })
      .catch(error => {
        Alert.alert('Network Error', 'Failed to connect to server'); // Handle network errors
      });
  };

  return (

    <ImageBackground
    source={require('../assets/background2.jpg')}
    style={styles.background}
    resizeMode="cover"
  >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} //Adjusts layout for keyboard on iOS and Android
    >

      <View style={styles.form}>
         {/* Form title changes based on the mode Connection ou register */}
        <Text style={styles.title}>{isLogin ? 'Connexion' : 'Inscription'}</Text>

        {/* Username input for signup mode only */}
        {!isLogin && (
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#7b4fff" />
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={username}
              onChangeText={setUsername} // Updates username state on change
            />
          </View>
        )}

        {/* Email input, shown in both login and signup modes */}
        <View style={styles.inputContainer}>
         {/* Email icon */}
          <FontAwesome name="envelope" size={20} color="#7b4fff" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail} // Updates username state on change
          />
        </View>

        {/* Password input, shown in both login and signup modes */}
        <View style={styles.inputContainer}>
          {/* Password icon */}
          <FontAwesome name="lock" size={20} color="#7b4fff" />
          <TextInput
            style={styles.input}
            placeholder="Mot de pass"
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Updates password state on change
          />
        </View>

        {/* Re-enter password input for signup mode only */}
        {!isLogin && (
          <View style={styles.inputContainer}>
            {/* Re-enter password icon */}
            <FontAwesome name="lock" size={20} color="#7b4fff" />
            <TextInput
              style={styles.input}
              placeholder="Réécrire Mot de pass"
              secureTextEntry
              value={retypePassword}
              onChangeText={setRetypePassword} // Updates retypePassword state on change
            />
          </View>
        )}

        {/* Submit button for login or signup */}
        <Pressable style={styles.button} onPress={handlePress}>
         {/* Button text changes based on mode */}
          <Text style={styles.buttonText}>{isLogin ? 'Se connecter' : 'Inscription'}</Text>
        </Pressable>

         {/* Toggles between login and signup modes */}
        <Text style={styles.switchText}>
          {isLogin ? "Nouveau utilisateur? " : "Déjà un compte ? "}
          <Text style={styles.link} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Créer un compte' : 'Connectez-vous'}
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
   background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7b4fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#7b4fff',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 15,
    fontSize: 14,
  },
  link: {
    color: '#7b4fff',
    fontWeight: 'bold',
  },
});
