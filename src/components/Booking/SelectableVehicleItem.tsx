import { Colors } from "@src/constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  item: Vehicle;
  checkedId: string;
  handleSelect: any;
}

const SelectableVehicleItem = ({ item, checkedId, handleSelect }: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.item, checkedId == item.id && styles.selectedItem]}
      onPress={() => handleSelect(item)}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.number}
        </Text>
      </View>
      <View style={styles.radioWrapper}>
        {checkedId == item.id && <View style={styles.radio} />}
      </View>
    </TouchableOpacity>
  );
};

export default SelectableVehicleItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedItem: { borderColor: Colors.light.primary },
  image: { width: 40, height: 40 },
  wrapper: { flex: 1, marginRight: 12 },
  title: { fontSize: 20, color: Colors.light.heading, fontWeight: "600" },
  subtitle: { fontSize: 14, color: Colors.light.subtitle, marginTop: 4 },
  radioWrapper: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    backgroundColor: Colors.light.primary,
    width: 12,
    height: 12,
    borderRadius: 100,
  },
});
