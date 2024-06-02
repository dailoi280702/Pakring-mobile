import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "react-native";
import GgMap from "@src/components/Home/Map";
import DetailModal from "@src/components/Home/DetailModal";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@src/store/hooks";
import { bookingActions } from "@src/store/slices/bookingSlice";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SelectableMenuItem from "@src/components/Home/SelectableMenuItem";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [distance, setDistance] = useState(0);
  const ref = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOption, setMenuOption] = useState(1);

  useEffect(() => {
    if (isOpen === true) {
      ref?.current?.snapToIndex(0);
      setIsShowDetail(false);
    } else {
      ref?.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isShowDetail) {
      setIsOpen(false);
    }
  }, [isShowDetail]);

  const dispatch = useAppDispatch();

  const navigateBooking = () => {
    setIsShowDetail(false);
    navigation.navigate("ParkingDetailsScreen");
  };

  const menuItems = [
    { value: 1, label: "All parking lots" },
    { value: 2, label: "Available parking lots" },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <GgMap
          onSelectedMarker={(p: ParkingLot) => {
            dispatch(
              bookingActions.update({
                field: "parkingLot",
                value: p,
              }),
            );
            setIsShowDetail(true);
          }}
          setDistance={(d: number) => {
            setDistance(d);
          }}
          menuOption={menuOption}
          isMenuOpen={isOpen}
          setIsMenuOpen={setIsOpen}
        />

        <DetailModal
          isShow={isShowDetail}
          onClose={() => setIsShowDetail(false)}
          distance={distance}
          navigateBooking={navigateBooking}
        />

        <BottomSheet
          ref={ref}
          index={-1}
          enablePanDownToClose={true}
          snapPoints={[280, "52%", "95%"]}
          style={{
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
            borderRadius: 16,
          }}
        >
          <BottomSheetView>
            <View
              style={{
                paddingHorizontal: 20,
                height: "100%",
                backgroundColor: "white",
                display: "flex",
                gap: 12,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "500", marginBottom: 8 }}
              >
                Select map filter
              </Text>
              {menuItems.map(({ value, label }) => (
                <SelectableMenuItem
                  key={value}
                  text={label}
                  checkedId={menuOption == value}
                  handleSelect={() => {
                    setMenuOption(value);
                    setIsOpen(false);
                  }}
                />
              ))}
            </View>
          </BottomSheetView>
        </BottomSheet>
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
