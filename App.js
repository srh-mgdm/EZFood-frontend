import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import IngredientsScreen from "./screens/IngredientsScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import MealActionScreen from "./screens/MealActionScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import days from "./reducers/days";
import meals from "./reducers/meals";
import shop from "./reducers/shopping";

const store = configureStore({
  reducer: { user, days, meals, shop },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='SearchMeal' component={SearchScreen} />
            <Stack.Screen
              name='MealDetailScreen'
              component={MealDetailScreen}
            />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='MealAction' component={MealActionScreen} />
            <Stack.Screen name='Ingredients' component={IngredientsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
