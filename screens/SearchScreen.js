import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  // لیست اصلی غذاها
  const allMeals = [
    'Pâtes Carbonara',
    'Pâtes au saumon',
    'Pâtes et légumes',
    'Pâtes et poulet',
    'Salade de saumon',
    'Pizza aux légumes',
    'Soupe au poulet',
  ];

  // فیلتر کردن لیست غذاها براساس متن وارد شده
  const filteredMeals = allMeals.filter((item) =>
    item.toLowerCase().startsWith(searchText.toLowerCase()) // فقط مواردی که با حروف جستجو شروع می‌شوند
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={24} color="#4A4A4A" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* نمایش نتایج جستجو */}
      {searchText.length > 0 && (
        <FlatList
          data={filteredMeals}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultItem} onPress={() => setSearchText(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.noResultText}>Aucun repas trouvé</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  resultItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  noResultText: {
    textAlign: 'center',
    color: '#A0A0A0',
    marginVertical: 20,
  },
});
