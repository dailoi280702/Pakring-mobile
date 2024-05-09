import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import HomeScreen from "@src/screens/HomeScreen";
import React from "react";
import { HomeStackParams } from "../types";

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.light.heading,
        headerTitleAlign: "left",
        contentStyle: {
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
