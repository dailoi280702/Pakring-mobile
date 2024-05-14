import { Feather } from "@expo/vector-icons";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import dayjs from "dayjs";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const ParkingDetailsScreen = ({ navigation }: any) => {
  const parkingLot: ParkingLot = useAppSelector(selectBooking).parkingLot;

  const navigateNext = () => {
    navigation.navigate("SelectVehicleScreen");
  };

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
          <Text style={styles.title}>Operating hours</Text>
          <Text style={styles.hour}>
            {dayjs(parkingLot.startTime).format("HH:mm")} -{" "}
            {dayjs(parkingLot.endTime).format("HH:mm")}
          </Text>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.title}>Parking time</Text>
        </View>
      </ScrollView>
      <AppButton style={styles.button} onPress={navigateNext}>
        <Text style={styles.textButton}>Book now</Text>
      </AppButton>
    </View>
  );
};

export default ParkingDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingVertical: 20 },
  image: { height: 180, width: "100%", resizeMode: "cover", borderRadius: 12 },
  flexRow: { display: "flex", flexDirection: "row", alignItems: "center" },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginTop: 12,
    marginBottom: 4,
  },
  hour: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: 8,
  },
  address: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: 8,
  },
  description: { fontSize: 14, lineHeight: 18, color: Colors.light.subtitle },
  button: { position: "absolute", bottom: 10, right: 20, left: 20 },
  textButton: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
});
