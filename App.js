import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import meal from './reducers/meal';

const store = configureStore({
    reducer: { user , meal },
  });

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MealDetailScreen" component={MealDetailScreen} /> 
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SearchMeal" component={SearchScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
