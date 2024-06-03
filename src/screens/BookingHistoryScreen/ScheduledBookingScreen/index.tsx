import AsyncStorage from "@react-native-async-storage/async-storage";
import { ticketApi, timeFrameApi } from "@src/api";
import HistoryBookingItem from "@src/components/BookingHistory/HistoryBookingItem";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectNewTickets, selectUser } from "@src/store/selectors";
import { ticketActions } from "@src/store/slices/ticketSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";

type Props = {
  navigation: any;
};

const ScheduledBookingScreen = ({ navigation }: Props) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const userState = useAppSelector(selectUser);
  const newTicketsState = useAppSelector(selectNewTickets);
  const dispatch = useAppDispatch();

  const onExpire = () => {
    newTicketsState.forEach(async (e) => {
      if (dayjs(e.endTime).add(10, "minute").isBefore(new Date())) {
        const resTimeFrame = await timeFrameApi.getAll(e.parkingLotId);
        if (!resTimeFrame.data.data.data) {
          Alert.alert("Faild when check expire ticket!");
        }
        const ticketExtendReq = {
          ticketOriginId: e.id,
          timeFrameId: resTimeFrame.data.data.data[0].id,
          startTime: dayjs(e.endTime).utc().format(),
          endTime: dayjs(e.endTime)
            .add(resTimeFrame.data.data.data[0].duration, "minute")
            .utc()
            .format(),
          total: resTimeFrame.data.data.data[0].cost,
        };
        const res = await ticketApi.extendTicket(ticketExtendReq);
      }
    });
  };
  const onRefresh = () => {
    (async () => {  
      let idUser;
      if (userState?.id) {
        idUser = await AsyncStorage.getItem("idUser");
      }
      setRefreshing(true);
      dispatch(
        ticketActions.getTicketsScheduled(userState?.id || idUser)
      ).finally(() => setRefreshing(false));
    })();
    onExpire();
  };

  const navigationTicket = (item: Ticket) => {
    navigation.navigate("BookingTicketScreen", item);
  };

  useEffect(() => {
    dispatch(ticketActions.getTicketsScheduled(userState?.id));
  }, []);

  useEffect(() => {
    onExpire();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={newTicketsState}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryBookingItem
            onViewTicket={() => navigationTicket(item)}
            item={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ScheduledBookingScreen;
