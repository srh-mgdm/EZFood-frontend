import React , { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet,ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { selectMealDetail } from '../reducers/meals';
import { LinearGradient } from 'expo-linear-gradient';



export default function MealDetailScreen({ navigation: { goBack } , navigation  }) {
  
  const dispatch = useDispatch();
  const meal = useSelector((state) => state.meals.value.selectedMealDetails || []);
  const mealId = useSelector((state) => state.meals.value.selectedMeal || []);
  
   console.log(mealId)
  //console.log("Meal =>", meal);
  
 

  useEffect(() => { //fetch route meal par mealId
      fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/meals/${mealId}`) //flatMealId
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(selectMealDetail(data.meal)); //placer dans la valeur dans le reducer selectedMeal
            console.log('rerender')
          }
        })
        .catch((error) => {
          console.log("Cannot fetch meals :", error);
        });
   
  }, [mealId]);
  
  const ingredients = meal.mealIngredients?.map ((data , i) => (
    <View key={i} style={styles.ing}>
      <Text style={styles.list}> {i + 1}. {data.ingredientId.name}</Text>
      <Text style={styles.qt}>{data.quantity} {data.unit} </Text>
    </View>
  ))
  const steps = meal.mealPrepSteps?.map ((data , j) => (
    <View key={j} style={styles.az}>
      <Text style={styles.list}> {data.stepNumber}. {data.stepDescription}</Text>
    </View>
  ))
  
  const handleValidate = () => {
    //gerer l'ajout du repas
    navigation.navigate('Home')
  }
  
  
  return (
    <View style={styles.container}>
        <View style={styles.head}>
          <ImageBackground source={require('../assets/background2.jpg')} resizeMode="cover" style={styles.image}>
            <Text style={styles.color}> {meal.mealName} </Text>
            <FontAwesome name='pencil' size={40} color='white' onPress={() => navigation.navigate('Home')}/>
              {/* Faire la navigation vers la page edit */}
          </ImageBackground>
          
        </View>
        
        <View style={styles.ingredient}>
          <ScrollView style={styles.boxIng}>
            {ingredients}

          </ScrollView>
        </View>
        
        <View style={styles.infos}>
          <View style={styles.info}>
            <FontAwesome name='hourglass' size={20} color='white' />
            <Text style={styles.infoBox}> {meal.mealPrepTime} min </Text>
            </View>
          <View style={styles.info}>
            <FontAwesome name='spoon' size={20} color='black' />
            <Text style={styles.infoBox}> {meal.mealServings} {meal.mealServings > 1 ? "personnes" : "personne"} </Text>
          </View>
        </View>
        
        <View style={styles.recipe}>
            <ScrollView style={styles.boxRec}>
              {steps}
            </ScrollView>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.btn} onPress={() => goBack()} title="Go back from MealDetail">
                    
                    <Text style={styles.color}>ANNULER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleValidate()}>
                    <Text style={styles.color}>VALIDER</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {

  },
  
  color: {
    color : 'white', 
    fontSize: 20,
  },
  
  
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightblue',
  },

  head: {
    height: 100,
    width: '100%',
  },

  image: {
    height : '100%',
    width : '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  ingredient: {
   
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
      boxIng: {

        width: '90%',
        borderWidth: 2,
        borderColor: 'purple',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor:'white',
        
      },

        ing: {

          flexDirection: 'row',
          justifyContent: 'space-between',
             
        },

            list: {
              fontSize: 20,
            },

            qt: {
              fontSize: 20,
            },
  
  infos: {

    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
      info: {

        height: 60,
        width: 120,
        borderRadius: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        
      },
        infoBox: {
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 10,
          shadowColor: '#000',
          
        },

  recipe: {

    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'

  },
      boxRec: {

        borderWidth: 2,
        borderColor: 'purple',
        borderRadius: 10,
        marginBottom: 30,
        height: '90%',
        width: '90%',
        marginTop: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor:'white',

      },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },

      btn: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        padding: 10,
        backgroundColor: 'purple',

      },
});
