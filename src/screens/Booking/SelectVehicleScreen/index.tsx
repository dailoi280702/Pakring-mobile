import { useAppSelector } from "@src/store/hooks";
import { selectVehicles } from "@src/store/selectors";
import { Text, View } from "react-native";

const SelectVehicleScreen = ({ navigation }: any) => {
  const vehicleState = useAppSelector(selectVehicles);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Text>{JSON.stringify(vehicleState)}</Text>
    </View>
  );
};

export default SelectVehicleScreen;
