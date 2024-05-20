import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ReserveParkingScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView
        style={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Text>{JSON.stringify(bookingState)}</Text>
      </ScrollView>
      <AppButton style={styles.continueButton}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default ReserveParkingScreen;

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
