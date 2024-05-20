import { Spinner } from "@nghinv/react-native-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { getVehicleAction } from "@src/store/actions/vehicleAction";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectVehicles } from "@src/store/selectors";
import { ColorHelper } from "@src/utils";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const SelectVehicleScreen = ({ navigation }: any) => {
  const vehicleState = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getVehicle = async () => {
      Spinner.show();
      const idUser = await AsyncStorage.getItem("idUser");
      dispatch(getVehicleAction(idUser));
    };

    getVehicle();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <FlatList
        data={vehicleState}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <AppButton style={styles.addButton}>
            <Text style={styles.addText}>Add new vehicle</Text>
          </AppButton>
        }
      />
      <AppButton style={styles.continueButton}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectVehicleScreen;

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  addButton: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.primary, 0.2),
    marginTop: 12,
    marginBottom: 50,
  },
  addText: {
    color: Colors.light.primary,
    fontSize: 18,
    fontWeight: "600",
  },
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
