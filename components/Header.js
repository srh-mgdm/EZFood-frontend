import React from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


//creer une fct qui gere la redirection vers la page login en fct de l'etat de connnection

export const Header = () => {
    return (
        <View>
            <View style={[styles.header,styles.background]}>
                <Text style={[styles.textHead, styles.color]} >EZ FOOD</Text>
                <FontAwesome name='user' size={30} color='white' onPress={() => navigation.navigate('Login')}/>
                    {/* Redirection vers la page de connection */}
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
    textHead:{
        fontSize: 20,
        fontWeight: 'bold',
    }
})
