import React from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user'; 


//creer une fct qui gere la redirection vers la page login en fct de l'etat de connnection

export const Header = ({navigation}) => {
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value.username);
    let icon;
    
    if (!user) {
        icon = <FontAwesome name='user' size={30} color='white' onPress={() => navigation.navigate('Login')} />;
    } else {
        icon = <FontAwesome name='sign-out' size={30} color='white' onPress={() => dispatch(logout()) }/>;
    }

    return (
        <View>
            <View style={[styles.header,styles.background]}>
                <Text style={[styles.textHead, styles.color]} >EZ FOOD</Text>
                <View style={styles.right}>
                <Text>{user ? user : 'INVITE'}</Text>
                    {icon}
                    {/* Redirection vers la page de connection en invité ou vers logout qd connecté */}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'blue',
    },

    color: {
        color: 'black',
    },

    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center' ,
        paddingRight: '5%',
        paddingLeft: '5%',
    },
    right: {
        flexDirection: 'row',
        
    },

    textHead:{
        fontSize: 20,
        fontWeight: 'bold',
    }
})
