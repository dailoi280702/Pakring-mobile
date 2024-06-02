import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import parkingLotApi from "@src/api/parkingLotApi";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

type Props = {
  onSelected: any;
  currentLocation: MapLocation;
  isMenuOpen: boolean;
  setIsMenuOpen: (_: boolean) => void;
};

export type MapLocation = {
  latitude: number;
  longitude: number;
};

const SearchAutocomplete = (props: Props) => {
  const [value, setValue] = useState<string>();
  const [data, setData] = useState<ParkingLot[]>([]);
  const ref = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      ref?.current?.snapToIndex(0);
    } else {
      ref?.current?.close();
    }
  }, [isOpen]);

  const handleChangeText = async (
    text: string,
    currentLocation: MapLocation,
  ) => {
    if (text.length >= 2) {
      try {
        const result = await parkingLotApi.getAll({
          name: text,
        });
        if (result.data.data.length > 0) setData(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const menuData = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
  ];

  return (
    <>
      <View style={styles.searchContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={[styles.search, { flex: 10 }]}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="black"
              onPress={() => {
                setData([]);
                setValue(null);
              }}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#CBD5E1"
              style={styles.input}
              value={value}
              onChangeText={(text) => {
                handleChangeText(text, props.currentLocation);
                if (text) {
                  setValue(text);
                } else {
                  setValue(null);
                }
              }}
            />
            {value && (
              <AntDesign
                name="closecircleo"
                onPress={() => setValue(null)}
                size={18}
                color="black"
              />
            )}
            <AntDesign
              name="filter"
              style={{ marginLeft: 12 }}
              size={20}
              color="black"
              onPress={() => props.setIsMenuOpen(!props.isMenuOpen)}
            />
          </View>
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          style={{ margin: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                props.onSelected(item);
                setData([]);
                setValue(item.name);
              }}
            >
              {SearchItem(item)}
            </TouchableOpacity>
          )}
        />
      </View>

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
            }}
          >
            <Text>No data</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default SearchAutocomplete;

const SearchItem = (item: ParkingLot) => {
  return (
    <View style={styles.itemContainer}>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: Colors.light.tabIconDefault,
        }}
      >
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemAddress} numberOfLines={1}>
          {item.address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    overflow: "visible",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.light.subtitle,
    backgroundColor: Colors.light.background,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  input: {
    marginLeft: 15,
    marginRight: 10,
    flex: 1,
    height: "100%",
    color: Colors.light.text,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    marginVertical: 10,
    marginHorizontal: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "400",
  },
  itemAddress: {
    fontSize: 14,
    marginTop: 2,
    color: "#56585D",
  },
  image: {
    borderRadius: 11,
    marginRight: 10,
  },
});
