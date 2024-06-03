/* eslint-disable no-unsafe-optional-chaining */
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import { ColorHelper, CurrencyHelper } from "@src/utils";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: Ticket;
  onViewTicket: any;
};

const HistoryBookingItem = ({ item, onViewTicket }: Props) => {
  const parkingLot = item.parkingLot;
  return (
    <TouchableOpacity style={styles.container} onPress={onViewTicket}>
      <View style={[styles.flexRow, { alignItems: "center", justifyContent: "space-between" }]}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {item.state == "new" || item.state == "completed" || item.state == "ongoing" ? (
            <View style={[styles.status, styles[`${item.state}`]]}>
              <Text style={styles.statusText}>
                {item.state[0].toUpperCase() + item.state.slice(1, item.state.length)}
              </Text>
            </View>
          ) : (
            <View style={[styles.status, styles.cancelled]}>
              <Text style={[styles.statusText, styles.scheduleText]}>Cancelled</Text>
            </View>
          )}
          {item.isExtend && (
            <View style={[styles.status, styles.extend]}>
              <Text style={[styles.statusText]}>{item.exitTime ? "Expired" : "Extend"}</Text>
            </View>
          )}
        </View>
        <Text style={styles.price} numberOfLines={1}>
          {CurrencyHelper.formatVND(item?.total)}
        </Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {parkingLot?.name}
      </Text>
      <View style={[styles.flexRow]}>
        <Feather name="map-pin" size={14} color={Colors.light.subtitle} />
        <Text style={styles.subtitle} numberOfLines={1}>
          {parkingLot?.address}
        </Text>
      </View>
      <View style={[styles.flexRow, { marginTop: 12, alignItems: "center" }]}>
        <Feather name="calendar" size={20} color={Colors.light.text} />
        <View style={styles.wrapper}>
          <Text style={styles.date} numberOfLines={1}>
            {dayjs(item?.startTime).format("DD MMM YY")}
          </Text>
          <Text style={styles.time} numberOfLines={1}>
            {dayjs(item?.startTime).format("HH:mm")}
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.light.text} />
        <View style={styles.wrapper}>
          <Text style={styles.date} numberOfLines={1}>
            {dayjs(item?.endTime).format("DD MMM YY")}
          </Text>
          <Text style={styles.time} numberOfLines={1}>
            {dayjs(item?.endTime).format("HH:mm")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryBookingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  status: {
    borderRadius: 20,
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.success, 0.15),
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  extend: {
    marginLeft: 8,
    backgroundColor: ColorHelper.hexToRgbA("#2FB8ED", 0.1),
  },
  new: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.warning, 0.1),
  },
  ongoing: {
    backgroundColor: ColorHelper.hexToRgbA("#FED500", 0.15),
  },
  completed: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.success, 0.15),
  },
  cancelled: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.danger, 0.25),
  },
  scheduleText: {
    color: "red",
  },
  statusText: {
    color: Colors.light.success,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
  },
  price: { fontSize: 20, fontWeight: "700", color: Colors.light.primary },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.subtitle,
    marginLeft: 4,
    paddingRight: 20,
  },
  flexRow: { display: "flex", flexDirection: "row" },
  wrapper: { marginHorizontal: 12 },
  date: { fontWeight: "600", fontSize: 14, color: Colors.light.text },
  time: { fontWeight: "500", fontSize: 14, color: Colors.light.text },
});
