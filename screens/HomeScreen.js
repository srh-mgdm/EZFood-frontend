// import React from 'react';
// import {
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Button,
//   ScrollView,
// } from 'react-native';
// import {Header} from '../components/Header'
// import {Card} from '../components/Card'
// import { NavigationProp, ParamListBase } from '@react-navigation/native';

// export default function HomeScreen({ navigation }) {




//     return (
//         <View style={styles.container}>
//             <View style={styles.head}>
//                 <Header navigation={navigation}/>
//             </View>
//             <ScrollView contentContainerStyle={styles.main}>

//                 <Card/>
//                 <Card/>
//                 <Card/>
//                 <Card/>
//                 <Card/>
//                 <Card/>
//                 <Card/>
//                 <Card/>
//                 <Card/>
//                 <Card/>


//         </ScrollView>
//         </View>

//     )
// };


// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         marginTop: '10%',

//     },

//     head: {
//         height: 50,
//         width: '100%'
//     },

//     main: {

//     },

//     main: {
//         flexGrow: 5,
//         paddingBottom: 10,
//         display: "flex",
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         flexWrap: 'wrap',
//         minHeight: "100%",
//         maxHeight: '500%',
//         paddingBottom: 10,
//     }
// })

import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
} from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Header navigation={navigation} />
            </View>
            <ScrollView contentContainerStyle={styles.main}>
<<<<<<< HEAD
                <Card navigation={navigation} />
                <Card navigation={navigation} />
                <Card navigation={navigation} />
                <Card navigation={navigation} />
                <Card navigation={navigation} />
                <Card navigation={navigation} />
                <Card navigation={navigation} />
                <Card navigation={navigation} />
                <Card navigation={navigation} />
                <Card navigation={navigation} />
            </ScrollView>
=======

                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>


                
        </ScrollView>
>>>>>>> db2be50950c9125f62c58508ed3c08b32abb0fda
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%',
    },
    head: {
        height: 50,
        width: '100%',
    },
    main: {
        flexGrow: 5,
        paddingBottom: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        minHeight: "100%",
        maxHeight: '500%',
        paddingBottom: 10,
    },
});
