import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
        justifyContent: 'space-around',
    },
});
