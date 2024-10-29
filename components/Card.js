// import React from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//   } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// export const Card = () => {
//     return (
//         <View style={[styles.card,styles.background]}>
//             <Text>Day</Text>
//             <View style={styles.meal}>
//                 <FontAwesome name='plus' size={30} color='white' onPress={() => navigation.navigate('Meal')}/>
//                     {/* Redirection vers la page meal */}
//                 <Text style = {styles.color}>ADD MEAL</Text>
//             </View>
//             <View style={[styles.meal , styles.background]}>
//                 <FontAwesome name='plus' size={30} color='white' onPress={() => navigation.navigate('Meal')}/>
//                 <Text style = {styles.color}>ADD MEAL</Text>
//             </View>
//         </View>

//     )
// }

// const styles = StyleSheet.create({
//     background: {
//         backgroundColor: 'blue',
//     },

//     color: {
//         color: 'white',
//     },

//     card: {
//         height: 150,
//         width: 180,
//         flexDirection: 'column',
//         borderWidth: 1,
//         borderColor: 'red',
//         justifyContent: 'space-between',
//         alignItems: 'center' ,
//         marginTop: 20,



//     },
//     meal: {
//         width: '100%',
//         height: '48%',
//         flexDirection: 'row',
//         justifyContent:'space-around'
//     }


// })

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
    

    
    
    const handleAddMeal = () => {
        fetch('http://localhost:3000/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mealname: mealname, }),
        }).then(response => response.json())
          .then(data => {
            if (data.result) {
              dispatch(login({ username: signInUsername, token: data.token }));
              
            }
          });
      };

      



export const Card = ({navigation}) => {

    const [meal, setMeal] = useState(null); 
    const [mealname, setMealname] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value.token);

    const tab = [
                    {mealName : 'Pates au saumon',dayName : 'Lundi',dayNumber : 1 },
                    {mealName : 'Crepes au nutella',dayName : 'Lundi',dayNumber : 1 },
                    {mealName : 'Riz au curry',dayName : 'Mardi',dayNumber : 2 },
                    {mealName : 'Pates bolognaise',dayName : 'Mardi',dayNumber : 2 },
                    {mealName : 'Salade de thon',dayName : 'Mercredi',dayNumber : 3 },
                    {mealName : 'Gaufres confiture',dayName : 'Mercredi',dayNumber : 3 },
                    {mealName : 'Pates au nutella',dayName : 'Jeudi',dayNumber : 4 },
                    {mealName : 'Macdo',dayName : 'Jeudi',dayNumber : 4 },
    ]

    // useEffect(() => {
    //     if (!user) {

    //     }
         
    //  }, []);

        let card;
             
        if (!meal) {
            card = tab.map((data , i) => ( 
                <View key={i} style={styles.meal}> 
                    <Text> {data.dayName} - Jour {data.dayNumber} </Text>
                    <FontAwesome name='plus' size={30} color='white' onPress={() => navigation.navigate('Meal')}/>
                    <Text style = {styles.color}> ADD MEAL</Text>    
                </View>
            ))
        } else {
            card = tab.map((data , i) => ( 
                <View key={i} style={styles.meal}>
                    <Text> Jour {meal.dayNumber} </Text>
                    <FontAwesome name='trash-o' size={30} color='white' onPress={() => setMeal(null)}/>
                    <Text style = {styles.color}> {meal.mealName} </Text> 
                </View>
            ))
        }
       


<<<<<<< HEAD
export const Card = ({ navigation }) => {
    return (
        <View style={[styles.card, styles.background]}>
            <Text>Day</Text>
            <View style={styles.meal}>
                <FontAwesome
                    name="plus"
                    size={30}
                    color="white"
                    onPress={() => navigation.navigate('SearchMeal')}
                />
                <Text style={styles.color}>ADD MEAL</Text>
            </View>
            <View style={[styles.meal, styles.background]}>
                <FontAwesome
                    name="plus"
                    size={30}
                    color="white"
                    onPress={() => navigation.navigate('SearchMeal')}
                />
                <Text style={styles.color}>ADD MEAL</Text>
=======
    return (
        <View style={styles.card}>
            <View style={[styles.meal , styles.background]}>
                    {card}
                    {/* Redirection vers la page meal */}
                
            </View>
            <View style={[styles.meal , styles.background]}>
                    {card}
                    {/* supprimer un repas enregistré */}
>>>>>>> db2be50950c9125f62c58508ed3c08b32abb0fda
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'blue',
    },
    color: {
        color: 'white',
    },
    card: {
        height: 150,
        width: 180,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    meal: {
        width: '100%',
        height: '48%',
        flexDirection: 'row',
<<<<<<< HEAD
        justifyContent: 'space-around',
    },
});
=======
        justifyContent:'space-around',
        borderWidth: 1,
        borderColor: 'black',
    }


})
>>>>>>> db2be50950c9125f62c58508ed3c08b32abb0fda
