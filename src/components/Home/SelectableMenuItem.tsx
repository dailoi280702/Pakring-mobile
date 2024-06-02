import { Colors } from "@src/constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  text: string;
  checkedId: boolean;
  handleSelect: any;
}

const SelectableMenuItem = ({ text, checkedId, handleSelect }: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.item, checkedId && styles.selectedItem]}
      onPress={handleSelect}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title} numberOfLines={2}>
          {text}
        </Text>
      </View>
      <View style={styles.radioWrapper}>
        {checkedId && <View style={styles.radio} />}
      </View>
    </TouchableOpacity>
  );
};

export default SelectableMenuItem;

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
    justifyContent: "space-between",
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedItem: {
    borderColor: Colors.light.primary,
  },
  image: { width: 34, height: 34, marginVertical: 6 },
  wrapper: { flex: 1, marginHorizontal: 16 },
  title: { fontSize: 16, color: Colors.light.heading, fontWeight: "500" },
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
