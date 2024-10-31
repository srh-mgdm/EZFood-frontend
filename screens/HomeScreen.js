import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { DayCard } from "../components/dayCard";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
<<<<<<< HEAD




    return (
        <View style={styles.container}>
            
            <View style={styles.head}>
                <Header navigation={navigation}/>
            </View>
            
            <ScrollView contentContainerStyle={styles.main}>
                <Card navigation={navigation}/>
            </ScrollView>
        </View>

    )
};

=======
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Header navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        <DayCard navigation={navigation} />
      </ScrollView>
    </View>
  );
}
>>>>>>> 4a92a529e04fb31be012c2e47d98ae23f3352d1e

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
  },
  head: {
    height: 50,
    width: "100%",
  },
  main: {
    flexGrow: 5,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    minHeight: "100%",
    maxHeight: "500%",
    paddingBottom: 10,
  },
});
