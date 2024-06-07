import { Feather } from "@expo/vector-icons";
import TimeItem from "@src/components/Home/TimeItem";
import AppButton from "@src/components/common/AppButton";
import { Colors, Spacing } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectTimeFrames } from "@src/store/selectors";
import { timeFrameActions } from "@src/store/slices/timeFrameSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ReadMore from "@src/components/common/ReadMore";
import { Spinner } from "@nghinv/react-native-loading";
import { parkingLotApi, parkingSlotApi } from "@src/api";
import { HomeStackParams } from "@src/navigation/Stack/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { bookingActions } from "@src/store/slices/bookingSlice";

type Props = NativeStackScreenProps<HomeStackParams, "ParkingDetailsScreen">;

const ParkingDetailsScreen = ({ navigation, route }: Props) => {
  const parkingLotId = route.params.parkingLotId;
  const [parkingLot, setParkingLot] = useState<ParkingLot>();
  const timeFrames = useAppSelector(selectTimeFrames);
  const dispatch = useAppDispatch();
  const [numOfAvailableSlots, setNumOfAvailableSlots] = useState(0);
  const [parkingLotInfo, setParkingLotInfo] = useState<ParkingLotInfo>();
  const [loaded, setLoaded] = useState(false);

  const navigateNext = () => {
    if (numOfAvailableSlots > 0) {
      navigation.navigate("SelectVehicleScreen");
    }
  };

  useEffect(() => {
    if (!parkingLotId) return;

    const getNumOfSlots = async () => {
      const startTime = dayjs();
      const endTime = startTime.add(1, "hour");
      const slotAvailable = await parkingSlotApi.getAvailableSlots(
        startTime.utc().format(),
        endTime.utc().format(),
        parkingLotId,
      );
      let num = 0;
      if (slotAvailable.data.data) {
        slotAvailable.data.data.forEach((e: any) => {
          num += e.parkingSlots.length;
        });
      }
      setNumOfAvailableSlots(num);
    };

    const getParkingLotInfo = async () => {
      const res = await parkingLotApi.getListInfo([parkingLotId]);
      if (res.data.data && res.data.data.length && res.data.data.length > 0) {
        setParkingLotInfo(res.data.data[0]);
      }
    };

    const getParkingLotDetail = async () => {
      const res = await parkingLotApi.getOne(parkingLotId);
      if (res.data.data) {
        setParkingLot(res.data.data as ParkingLot);
      }
    };

    Spinner.show();
    Promise.all([
      getNumOfSlots(),
      getParkingLotInfo(),
      getParkingLotDetail(),
      dispatch(timeFrameActions.getTimeFrames(parkingLotId)),
    ])
      .then(() => setLoaded(true))
      .catch((e) => {
        console.log(e);
        navigation.canGoBack() && navigation.goBack();
        Alert.alert("Can not get parking lot details at this moment");
      })
      .finally(() => Spinner.hide());
  }, [parkingLotId]);

  useEffect(() => {
    if (loaded && parkingLot) {
      dispatch(
        bookingActions.update({
          field: "parkingLot",
          value: parkingLot,
        }),
      );
    }
  }, [loaded, parkingLot]);

  if (!loaded || !parkingLot) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://shopping.saigoncentre.com.vn/Data/Sites/1/News/32/013.jpg",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{parkingLot?.name}</Text>
          <View style={styles.flexRow}>
            <Feather name="map-pin" size={18} color={Colors.light.heading} />
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.address}>
              {parkingLot?.address}
            </Text>
          </View>
          {parkingLotInfo && (
            <>
              <Text style={styles.title}>Reviews</Text>
              <View style={[styles.flexRow, { gap: 4 }]}>
                <Text style={styles.address}>
                  Total booked slot: {parkingLotInfo.totalBookedSlots}
                </Text>
                <Text style={[styles.address, { color: Colors.light.success }]}>
                  Good reviews: {parkingLotInfo.goodReviews}
                </Text>
                <Text style={[styles.address, { color: Colors.light.warning }]}>
                  Bad reviews: {parkingLotInfo.badReviews}
                </Text>
              </View>
            </>
          )}
          <Text style={styles.title}>Operating hours</Text>
          <Text style={styles.hour}>
            {dayjs(parkingLot.startTime).format("HH:mm")} -{" "}
            {dayjs(parkingLot.endTime).format("HH:mm")}
          </Text>
          {parkingLot.description && (
            <>
              <Text style={styles.title}>Description</Text>
              <ReadMore
                maxLine={4}
                lineHeight={20}
                content={parkingLot?.description}
                styleText={styles.description}
              />
            </>
          )}
          <Text style={styles.title}>Parking time</Text>
          <FlatList
            data={timeFrames}
            renderItem={({ item }) => (
              <TimeItem period={item.duration} cost={item.cost} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <AppButton
        style={{
          ...styles.button,
          opacity: numOfAvailableSlots > 0 ? 1 : 0.8,
        }}
        onPress={navigateNext}
      >
        <Text style={styles.textButton}>
          {numOfAvailableSlots > 0 ? "Book now" : "No slots available"}
        </Text>
      </AppButton>
    </View>
  );
};

export default ParkingDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingVertical: 20 },
  image: {
    height: 180,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
    borderColor: "#a1a1a1",
    borderWidth: 1,
  },
  flexRow: { display: "flex", flexDirection: "row", alignItems: "center" },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginTop: 20,
    marginBottom: 4,
  },
  hour: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: Spacing.s,
  },
  address: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: Spacing.s,
  },
  description: { fontSize: 14, lineHeight: 18, color: Colors.light.subtitle },
  button: {
    position: "absolute",
    bottom: 10,
    right: 20,
    left: 20,
  },
  textButton: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
});
