import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryBookingItem from "@src/components/BookingHistory/HistoryBookingItem";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectCompletedTickets, selectUser } from "@src/store/selectors";
import { ticketActions } from "@src/store/slices/ticketSlice";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

type Props = {
  navigation: any;
};

const CompletedBookingScreen = ({ navigation }: Props) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const completedTicketState = useAppSelector(selectCompletedTickets);

  const onRefresh = () => {
    (async () => {
      let idUser;
      if (userState?.id) {
        idUser = await AsyncStorage.getItem("idUser");
      }
      setRefreshing(true);
      dispatch(
        ticketActions.getTicketsCompleted(userState?.id || idUser)
      ).finally(() => setRefreshing(false));
    })();
  };

  const navigationTicket = (item: Ticket) => {
    navigation.navigate("BookingTicketScreen", item);
  };

  useEffect(() => {
    (async () => {
      let idUser;
      if (userState?.id) {
        idUser = await AsyncStorage.getItem("idUser");
      }
      dispatch(ticketActions.getTicketsCompleted(userState?.id || idUser));
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={completedTicketState}
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

export default CompletedBookingScreen;
