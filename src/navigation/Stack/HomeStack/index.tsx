import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import HomeScreen from "@src/screens/HomeScreen";
import { HomeStackParams } from "../types";
import { Platform } from "react-native";
import ParkingDetailsScreen from "@src/screens/ParkingDetailsScreen";
import SelectVehicleScreen from "@src/screens/Booking/SelectVehicleScreen";
import ReserveParkingScreen from "@src/screens/ReverseParkingScreen";
import SelectParkingSlotScreen from "@src/screens/Booking/SelectParkingSlotScreen";
import SelectPaymentScreen from "@src/screens/Booking/SelectPaymentScreen";
import SummaryScreen from "@src/screens/Booking/SummaryScreen";
import ParkingTicketScreen from "@src/screens/Booking/ParkingTicketScreen";

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

      <Stack.Screen
        name="ReserveParkingScreen"
        component={ReserveParkingScreen}
        options={{
          title: "Reserve parking",
          ...headerOption,
        }}
      />

      <Stack.Screen
        name="SelectParkingSlotScreen"
        component={SelectParkingSlotScreen}
        options={{
          title: "Select parking slot",
          ...headerOption,
        }}
      />

      <Stack.Screen
        name="SelectPaymentScreen"
        component={SelectPaymentScreen}
        options={{
          title: "Select payment method",
          ...headerOption,
        }}
      />

      <Stack.Screen
        name="SummaryScreen"
        component={SummaryScreen}
        options={{
          title: "Review summary",
          ...headerOption,
        }}
      />

      <Stack.Screen
        name="ParkingTicketScreen"
        component={ParkingTicketScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
