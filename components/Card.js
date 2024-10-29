import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMeal } from '../reducers/meal';
    

export const Card = ({navigation}) => {

    const [meal, setMeal] = useState(null); 
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value.token);
    const meals = useSelector((state) => state.meal.value || []);


    useEffect(() => {
        if (user) {
            fetch('http://192.168.25.148:3000/days', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${user}`,
                  'Content-Type': 'application/json'
                }
                
              }).then(response => response.json())
                .then(data => {
                  if (data.result) {
                    dispatch(addMeal(data.days))
                    
                    
                  }
                });

        }
         
     }, []);

     console.log(meals)

     const card = meals.length > 0 ? (
        meals.map((data, i) => (
            <View key={i} style={styles.card}>
                <View style={[styles.meal, styles.background]}>
                    <Text style={styles.day}>{data.dayName} - Jour {data.dayNumber}</Text>
                    <View style={styles.m}>
                        <FontAwesome name="plus" size={30} color="white" onPress={() => navigation.navigate('SearchMeal')} />
                        <Text style={styles.color}></Text>
                    </View>
                </View>
                <View style={[styles.meal, styles.background]}>
                    <Text style={styles.day}>{data.dayName} - Jour {data.dayNumber}</Text>
                    {data.meals.map((meal, j) => (
                        <View key={j} style={styles.meal}>
                            <Text style={styles.color}>{meal.mealName}</Text>
                            <FontAwesome name="trash-o" size={20} color="white" onPress={() => setMeal(null)} />
                        </View>
                    ))}
                </View>
            </View>
        ))
    ) : (
        <Text style={styles.color}>No meals available</Text>
    );

    return <View style={styles.container}>{card}</View>;
};

             
        // if (!meal) {
        //     card = tab.map((data , i) => ( 
        //         <View key={i} style={styles.meal}> 
        //             <Text> {data.dayName} - Jour {data.dayNumber} </Text>
        //             <FontAwesome name='plus' size={30} color='white' onPress={() => navigation.navigate('SearchMeal')}/>
        //             <Text style = {styles.color}> ADD MEAL</Text>    
        //         </View>
        //     ))
        // } else {
        //     card = tab.map((data , i) => ( 
        //         <View key={i} style={styles.meal}>
        //             <Text> Jour {meal.dayNumber} </Text>
        //             <FontAwesome name='trash-o' size={30} color='white' onPress={() => setMeal(null)}/>
        //             <Text style = {styles.color}> {meal.mealName} </Text> 
        //         </View>
        //     ))
        // }
       


    return (
        <View style={styles.container}>
            
                    {card}
                    {/* Redirection vers la page meal */}
                
            
        </View>

    )
}

const styles = StyleSheet.create({ 
    background: {
        backgroundColor: 'blue',
    },

    color: {
        color: 'white',
    },

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    card: {
        height: 150,
        width: 180,
        
        borderWidth: 1,
        borderColor: 'red',
        
        marginTop: 20,
        
    },
    
    day: {
        height:'40%',
        width:'100%',
    },
    
    meal: {
        height:'50%',
        width:'100%',
    

    }

})