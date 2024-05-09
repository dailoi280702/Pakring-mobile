import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
});
