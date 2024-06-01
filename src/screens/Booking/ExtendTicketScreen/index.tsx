import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { timeFrameApi } from "@src/api";
import { AppStackParams } from "@src/navigation/AppNavigator/types";
import { BookingHistoryStackParams } from "@src/navigation/Stack/types";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = NativeStackScreenProps<BookingHistoryStackParams, "ExntendTicket">;

const ExtendTicketScreen = (props: Props) => {
  const [timeFramesValid, setTimeFramesValid] = useState<TimeFrame[]>();
  const routeData = props.route.params;
  const ticket = routeData.ticketWithExtend.isExtend
    ? routeData.ticketWithExtend.ticketExtend[
        routeData.ticketWithExtend.ticketExtend.length - 1
      ]
    : routeData.ticketWithExtend;

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

  return <div>{JSON.stringify(timeFramesValid)}</div>;
};

export default ExtendTicketScreen;
