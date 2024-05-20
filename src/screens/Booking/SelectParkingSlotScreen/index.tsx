import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import { StyleSheet, Text, View } from "react-native";

const SelectParkingSlotScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text>{JSON.stringify(bookingState)}</Text>
      <AppButton style={styles.continueButton}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectParkingSlotScreen;

const styles = StyleSheet.create({
  continueButton: {
    marginTop: 12,
    position: "absolute",
    bottom: 10,
    right: 20,
    left: 20,
  },
  countinueText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
});
