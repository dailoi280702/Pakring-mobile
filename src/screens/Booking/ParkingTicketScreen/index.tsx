import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import { Text, View } from "react-native";

const ParkingTicketScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);

  return (
    <View style={{ flex: 1 }}>
      <Text>Ticket details screen</Text>
      <Text>{JSON.stringify(bookingState.idTicket)}</Text>
    </View>
  );
};

export default ParkingTicketScreen;
