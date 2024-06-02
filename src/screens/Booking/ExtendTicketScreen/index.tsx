import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ticketApi, timeFrameApi } from "@src/api";
import SelectableTimeItem from "@src/components/Booking/SelectableTimeItem";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { BookingHistoryStackParams } from "@src/navigation/Stack/types";
import { CurrencyHelper } from "@src/utils";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = NativeStackScreenProps<BookingHistoryStackParams, "ExntendTicket">;

const ExtendTicketScreen = (props: Props) => {
  const [timeFrameSelected, setTimeFrameSelected] = useState<TimeFrame>(null);
  const [timeFramesValid, setTimeFramesValid] = useState<TimeFrame[]>();
  const routeData = props.route.params;
  const ticket = routeData.ticketWithExtend.isExtend
    ? routeData.ticketWithExtend.ticketExtend[
        routeData.ticketWithExtend.ticketExtend.length - 1
      ]
    : routeData.ticketWithExtend;

  const onSelectTimeFrame = (tf: TimeFrame) => {
    setTimeFrameSelected(tf);
  };

  useEffect(() => {
    (async () => {
      const start = dayjs(ticket.endTime);
      const startToMinute = start.hour() * 60 + start.minute();
      const openTime = dayjs(routeData.ticketWithExtend.parkingLot.startTime);
      const openTimeToMinute = openTime.hour() * 60 + openTime.minute();
      const closeTime = dayjs(routeData.ticketWithExtend.parkingLot.endTime);
      const closeTimeToMinute = closeTime.hour() * 60 + closeTime.minute();
      const res = await timeFrameApi.getAll(ticket.parkingLotId);
      if (res.data.data.data) {
        var listTimeFrameValid = res.data.data.data.filter((element: any) => {
          return (
            startToMinute + element.duration >= openTimeToMinute &&
            startToMinute + element.duration <= closeTimeToMinute &&
            element.duration <= closeTimeToMinute - openTimeToMinute
          );
        });
        if (listTimeFrameValid.length <= 0) {
          Alert.alert(
            "Sorry, there is no available time frame for you. \nSee you later!",
          );
          props.navigation.goBack();
        }
        setTimeFramesValid(listTimeFrameValid);
      } else {
        Alert.alert("Faild!");
        props.navigation.goBack();
      }
    })();
  }, []);

  const handleExtend = async () => {
    const ticketExtendReq = {
      ticketOriginId: routeData.ticketWithExtend.id,
      timeFrameId: timeFrameSelected.id,
      startTime: dayjs(ticket.endTime).utc().format(),
      endTime: dayjs(ticket.endTime)
        .add(timeFrameSelected.duration, "minute")
        .utc()
        .format(),
      total: timeFrameSelected.cost,
    };
    const res = await ticketApi.extendTicket(ticketExtendReq);
    if (res.data) {
      Alert.alert("Successfully!");
    } else {
      Alert.alert("Failed!");
    }
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView
        style={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Duration</Text>
        <FlatList
          data={timeFramesValid}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SelectableTimeItem
              item={item}
              selectedId={timeFrameSelected?.id}
              onSelect={() => onSelectTimeFrame(item)}
            />
          )}
        />
        <Text style={styles.title}>Total</Text>
        <Text style={styles.total}>
          {CurrencyHelper.formatVND(timeFrameSelected?.cost) || "0₫"}
        </Text>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={handleExtend}>
        <Text style={styles.countinueText}>Extend</Text>
      </AppButton>
    </View>
  );
};

export default ExtendTicketScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    color: Colors.light.heading,
  },
  total: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.primary,
    textAlign: "right",
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
