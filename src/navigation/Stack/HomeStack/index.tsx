import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import HomeScreen from "@src/screens/HomeScreen";
import { HomeStackParams } from "../types";
import { Platform } from "react-native";
import ParkingDetailsScreen from "@src/screens/ParkingDetailsScreen";
import SelectVehicleScreen from "@src/screens/Booking/SelectVehicleScreen";

const Stack = createNativeStackNavigator<HomeStackParams>();

const headerOption = {
  headerStyle: {
    backgroundColor: Colors.light.background,
  },
  headerTitleStyle: {
    color: Colors.light.heading,
  },
};

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
          contentStyle: {
            paddingTop: Platform.OS === "android" ? 56 : 44,
            backgroundColor: Colors.light.background,
          },
        }}
      />
      <Stack.Screen
        name="ParkingDetailsScreen"
        component={ParkingDetailsScreen}
        options={{
          title: "Parking details",
          ...headerOption,
        }}
      />

      <Stack.Screen
        name="SelectVehicleScreen"
        component={SelectVehicleScreen}
        options={{
          title: "Select your vehicle",
          ...headerOption,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
