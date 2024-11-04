import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';

export default function IngredientsScreen({ navigation, route }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const allIngredients = [];
        const fetchPromises = route.params.mealIds.map(async (mealId) => {
          const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/meals/${mealId}`);
          const data = await response.json();
          console.log(data.meal)
          data.meal.mealIngredients.forEach((mealIngredient) => {
            allIngredients.push({
              name: mealIngredient.ingredientId.name,
              qt: mealIngredient.ingredientId.servings[0].quantity,
              unitType: mealIngredient.ingredientId.servings[0].unit,
            });
          });
        });
        
        await Promise.all(fetchPromises);
        setIngredients(allIngredients); // Mise à jour de l'état avec tous les ingrédients récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients:', error);
      }
    };

    fetchIngredients();
  }, [route.params.mealIds]);

  const content = ingredients.map((data, i) => (
    <View key={i} style={styles.card}>
      <View style={styles.ingredientItem}>
        <Text style={styles.ingredientText}>{data.name}</Text>
        <Text style={styles.quantityText}>{data.qt} {data.unitType}</Text>
      </View>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Header navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.sectionContent}>
        <View>{content}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  head: {
    height: 50,
    width: '100%',
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginVertical: 10,
    paddingBottom: 15,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
