import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParams } from "@src/navigation/AppNavigator/types";

type Props = NativeStackScreenProps<AppStackParams, "ExntendTicket">;

const ExtendTicketScreen = (props: Props) => {
  return <div>Extend you ticket</div>;
};

export default ExtendTicketScreen;
