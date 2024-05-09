import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParams } from "@src/navigation/AppNavigator/types";
import { StatusBar } from "expo-status-bar";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import Map from "@src/components/Home/Map";
import DetailModal from "@src/components/Home/DetailModal";
import { useState } from "react";

type Props = NativeStackScreenProps<AppStackParams, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [distance, setDistance] = useState(0);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Map
          onSelectedMarker={(p: ParkingLot) => {
            setIsShowDetail(true);
            console.log(p);
          }}
          setDistance={(d: number) => {
            setDistance(d);
          }}
        />

        <DetailModal
          isShow={isShowDetail}
          onClose={() => setIsShowDetail(false)}
          distance={distance}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
});
