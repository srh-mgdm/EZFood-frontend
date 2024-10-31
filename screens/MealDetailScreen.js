import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet,ImageBackground, TouchableOpacity, ScrollView } from 'react-native';


export default function MealDetailScreen({ navigation }) {
  
  const meal = 	
    {
      mealName: "Pizza chèvre miel",
      mealPrepTime: 20,
      mealIngredients:
      [
          {name:"Pâte à pizza", quantity :300 , unit:"g"}, 
          {name:"Fromage de chèvre" , quantity:60 , unit :"g" }, 
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miels" , quantity:30 , unit:'ml' },
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miel" , quantity:30 , unit:'ml' },
          {name:"Miels" , quantity:30 , unit:'ml' },
      ],
      mealPrepSteps:
      [
          {stepNumber: 1 , stepDescription: "Faire cuire le poulet"},
          {stepNumber: 2 , stepDescription:"Faire cuire le riz"},
          {stepNumber: 3 , stepDescription:"Ajouter le beurre de cacachuètes"},
          {stepNumber: 4 , stepDescription:"Ajouter du poivre et du sel"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},
          {stepNumber: 5 , stepDescription:"Mélanger"},{stepNumber: 5 , stepDescription:"Mélangers"},
      ],
      mealServings: 1
  }
  
  const ingredients = meal.mealIngredients.map ((data , i) => (
    <View key={i} style={styles.ing}>
      <Text style={styles.list}> {i + 1}. {data.name}</Text>
      <Text style={styles.qt}>{data.quantity} {data.unit} </Text>
    </View>
  ))
  const steps = meal.mealPrepSteps.map ((data , i) => (
    <View key={i} style={styles.az}>
      <Text style={styles.list}> {data.stepNumber}. {data.stepDescription}</Text>
    </View>
  ))

  
  
  return (
    <View style={styles.container}>
      
      <View style={styles.head}>
        <ImageBackground source={require('../assets/background2.jpg')} resizeMode="cover" style={styles.image}>
          <Text style={styles.color}> {meal.mealName} </Text>
          <FontAwesome name='pencil' size={40} color='white' />
        </ImageBackground>
        
      </View>
      
      <View style={styles.ingredient}>
        <ScrollView style={styles.boxIng}>
          {ingredients}

        </ScrollView>
      </View>
      
      <View style={styles.infos}>
        <View style={styles.info}>
          <FontAwesome name='hourglass' size={20} color='grey' />
          <Text style={styles.infoBox}> {meal.mealPrepTime} min </Text>
          </View>
        <View style={styles.info}>
          <FontAwesome name='spoon' size={20} color='grey' />
          <Text style={styles.infoBox}> {meal.mealServings} {meal.mealServings > 1 ? "personnes" : "personne"} </Text>
        </View>
      </View>
      
      <View style={styles.recipe}>
          <ScrollView style={styles.boxRec}>
            {steps}
          </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} color='white' onPress={() => navigation.navigate('SearchMeal')}>
                  <Text style={styles.color}>ANNULER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} >
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
        borderRadius: 50,
        marginTop: 10,
        padding: 20,
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
          borderColor: 'black',
          borderRadius: 10,
          shadowColor: '#000',
          // shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.8,
          // shadowRadius: 2,
          // elevation: 5,
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
        borderRadius: 50,
        marginBottom: 30,
        padding: 20,
        height: '90%',
        width: '90%',
        
      },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },

      btn: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        padding: 10,
        backgroundColor: 'purple',

      },
});
