import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import HomeScreen from "@src/screens/HomeScreen";
import { HomeStackParams } from "../types";
import { Platform } from "react-native";

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
        options={{
          headerShown: false,
          contentStyle: { paddingTop: Platform.OS === "android" ? 56 : 44 },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
