import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { StyleSheet, Text, View } from "react-native";

const SelectPaymentScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Text>Choose payment method</Text>
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectPaymentScreen;

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
