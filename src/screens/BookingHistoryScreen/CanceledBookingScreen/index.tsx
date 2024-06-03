import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryBookingItem from "@src/components/BookingHistory/HistoryBookingItem";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectCancelTickets, selectUser } from "@src/store/selectors";
import { ticketActions } from "@src/store/slices/ticketSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

type Props = {
  navigation: any;
};

const CanceledBookingScreen = ({ navigation }: Props) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const userState = useAppSelector(selectUser);
  const cancelTicketsState = useAppSelector(selectCancelTickets);
  const dispatch = useAppDispatch();

  const onRefresh = () => {
    (async () => {
      let idUser;
      if (userState?.id) {
        idUser = await AsyncStorage.getItem("idUser");
      }
      setRefreshing(true);
      dispatch(
        ticketActions.getTicketsCanceled(userState?.id || idUser)
      ).finally(() => setRefreshing(false));
    })();
  };

  const navigationTicket = (item: Ticket) => {
    navigation.navigate("BookingTicketScreen", item);
  };
  useEffect(() => {
    dispatch(ticketActions.getTicketsCanceled(userState?.id));
  }, []);

  useEffect(() => {
    const isAfter = (date: any, endTime: any) => {
      if (dayjs(date).isBefore(dayjs(), "date")) {
        return true;
      } else if (dayjs(date).isSame(dayjs(), "date")) {
        const hour = endTime.substring(0, 2);
        const mins = endTime.substring(3, 5);
        const endDate = dayjs().set("hour", hour).set("minute", mins);

        if (endDate.isBefore(dayjs())) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={cancelTicketsState}
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

export default CanceledBookingScreen;
