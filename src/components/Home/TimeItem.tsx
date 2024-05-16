import { Colors } from "@src/constants";
import { DateTimeHelper } from "@src/utils";
import { View, Text, StyleSheet } from "react-native";

type Item = {
  period: number;
  cost: number;
};

const TimeItem = (item: Item) => (
  <View style={styles.container}>
    <Text style={styles.time}>{DateTimeHelper.convertToHour(item.period)}</Text>
    <Text style={styles.price}>{item.cost} VND</Text>
  </View>
);

export default TimeItem;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.light.subtitle,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginRight: 6,
    width: 100,
  },
  time: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.text,
  },
  price: {
    fontSize: 16,
    color: Colors.light.primary,
  },
});
