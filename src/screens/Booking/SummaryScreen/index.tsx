import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import { Text, View } from "react-native";

const SummaryScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);

  return (
    <View style={{ flex: 1 }}>
      <Text>{JSON.stringify(bookingState)}</Text>
    </View>
  );
};

export default SummaryScreen;
