import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// receiving `navigation` as a prop for navigation functionality
export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState(''); // Initialize searchText state for search input text

 // Define a list of all meals as the data source for searching
  const allMeals = [
    'Pâtes Carbonara',
    'Pâtes au saumon',
    'Pâtes et légumes',
    'Pâtes et poulet',
    'Salade de saumon',
    'Pizza aux légumes',
    'Soupe au poulet',
  ];

// Filter meals based on the search text, showing items that start with the search input
  const filteredMeals = allMeals.filter((item) =>
    item.toLowerCase().startsWith(searchText.toLowerCase()) // Match items starting with the search text
  );

  return (
    <ImageBackground source={require('../assets/background2.jpg')} style={styles.background}>

     {/* KeyboardAvoidingView to adjust screen layout when the keyboard is open */}
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

         {/* Search bar container */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={24} color="#4A4A4A" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Rechercher"
            placeholderTextColor="#4A4A4A"
            value={searchText}
            onChangeText={(text) => setSearchText(text)} // Update searchText state when text changes
          />
        </View>

        {/* Display filtered search results below search bar */}
        {searchText.length > 0 && (
          <FlatList
            data={filteredMeals}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultItem} onPress={() => setSearchText(item)}>
              {/* Each item in the list */}
                <Text style={styles.resultText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noResultText}>Aucun repas trouvé</Text>}
            keyExtractor={(item, index) => index.toString()} // Unique key for each item
          />
        )}

        {/* Button at the bottom of the screen to create a new meal */}
        <Pressable style={styles.createButton} onPress={() => alert('Créer un repas')}>
          <Text style={styles.createButtonText}>Créer un repas</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background image takes up the entire screen
    resizeMode: 'cover', // Adjusts background to cover the entire screen
  },
  container: {
    flex: 1, // Allows for full screen usage
    paddingHorizontal: 20, // Padding on left and right
    paddingTop: 150, // Top padding to push the content down
  },
  searchContainer: {
    flexDirection: 'row', // Row layout for search icon and input
    alignItems: 'center', // Center icon and text vertically
    backgroundColor: '#F0F0F0', // Light grey background for the search bar
    borderRadius: 10, // Rounded corners
    padding: 10, // Padding within the search bar
    marginBottom: 20, // Space below the search bar
  },
  searchIcon: {
    marginRight: 10, // Space between icon and input
  },
  input: {
    flex: 1, // Input takes remaining space
    fontSize: 16, // Font size of input text
  },
  resultItem: {
    paddingVertical: 10, // Vertical padding for each item
    paddingHorizontal: 15, // Horizontal padding for each item
    borderBottomWidth: 1, // Border at the bottom for separation
    borderBottomColor: '#D0D0D0', // Light grey color for border
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    borderRadius: 5, // Rounded corners for each item
    marginVertical: 5, // Margin between items
  },
  resultText: {
    color: '#fff', // White color for item text
    fontWeight: 'bold', // Bold text style
  },
  noResultText: {
    textAlign: 'center', // Center text alignment
    color: '#fff', // White color for no results text
    fontWeight: 'bold', // Bold text style
    padding: 10, // Padding around no results text
  },
  createButton: {
    backgroundColor: '#7b4fff', // Button background color
    paddingVertical: 15, // Vertical padding for button
    paddingHorizontal: 20, // Horizontal padding for button
    borderRadius: 10, // Rounded corners for button
    alignItems: 'center', // Center text in the button
    marginVertical: 20, // Vertical margin around the button
    alignSelf: 'center', // Center horizontally
    width: '90%', // Button width
  },
  createButtonText: {
    color: '#fff', // Button text color
    fontSize: 16, // Font size for button text
    fontWeight: 'bold', // Bold text for button
  },
});
