import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { favoriteApi, parkingSlotApi } from "@src/api";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectUser } from "@src/store/selectors";
import React, { useEffect, useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Spinner } from "@nghinv/react-native-loading";
import { Spacing } from "@src/constants";
import { favoriteActions } from "@src/store/slices/favoriteSlice";
dayjs.extend(utc);
import Config from "@src/config";

type Props = {
  isShow: boolean;
  onClose: any;
  distance: number;
  navigateBooking: (parkingLotId: string) => void;
};

const ActionButton = ({ action, icon }: { action: () => any; icon: any }) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.flexCenter, styles.actionButton]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const DetailModal = (props: Props) => {
  const { isShow, onClose } = props;
  const ref = React.useRef<BottomSheet>(null);
  const parkingLot = useAppSelector(selectBooking).parkingLot;
  const [numOfAvailableSlots, setNumOfAvailableSlots] = useState(0);
  const [favorite, setFavorite] = useState<{ id: string } | boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isShow === true) {
      onOpenBottomSheetHandler(0);
    } else {
      ref?.current?.close();
      // onOpenBottomSheetHandler(-1);
    }
  }, [isShow]);

  const onOpenBottomSheetHandler = (index: number) => {
    ref?.current?.snapToIndex(index);
  };

  const handleCall = () => {
    console.log("handle call");
    console.log(parkingLot);
    const baseUrl =
      Config.API_BASE_URL.substring(0, Config.API_BASE_URL.indexOf("/api/v1")) +
      "/api/merchant/company/get-one/" +
      parkingLot.companyID;
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => Linking.openURL(`tel:${data.data.phoneNumber}`))
      .catch((e) => console.log(e));
  };

  const onClickFavorite = () => {
    Spinner.show();
    if (!favorite) {
      favoriteApi
        .create({
          parkingLotId: parkingLot?.id,
          userId: user.id,
        })
        .then((res) => setFavorite(res.data))
        .finally(() => Spinner.hide());
    } else {
      if (typeof favorite == "object" && "id" in favorite) {
        favoriteApi
          .deleteOne(favorite.id)
          .then(() => setFavorite(null))
          .finally(() => Spinner.hide());
      }
    }
    dispatch(favoriteActions.getFavorites(user.id));
  };

  useEffect(() => {
    const getNumOfSlots = async () => {
      const startTime = dayjs();
      const endTime = startTime.add(1, "hour");
      const slotAvailable = await parkingSlotApi.getAvailableSlots(
        startTime.utc().format(),
        endTime.utc().format(),
        parkingLot?.id,
      );
      let num = 0;
      if (slotAvailable.data.data) {
        slotAvailable.data.data.forEach((e: any) => {
          num += e.parkingSlots.length;
        });
      }
      setNumOfAvailableSlots(num);
    };

    const getFavorite = async () => {
      return favoriteApi
        .getOne(user.id, parkingLot.id)
        .then((res) => {
          setFavorite(res.data);
        })
        .catch(() => setFavorite(false));
    };

    if (parkingLot && parkingLot.id) {
      Spinner.show();
      Promise.all([getNumOfSlots(), getFavorite()]).finally(() =>
        Spinner.hide(),
      );
    }
  }, [parkingLot]);

  return (
    <>
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose={true}
        onClose={onClose}
        snapPoints={[280, "52%", "95%"]}
        style={{
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          borderRadius: 16,
        }}
      >
        <BottomSheetView>
          <View
            style={{
              paddingHorizontal: 20,
              height: "100%",
              backgroundColor: "white",
            }}
          >
            {parkingLot ? (
              <>
                <View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 12,
                      flexShrink: 0,
                    }}
                  >
                    <View
                      style={{
                        flexShrink: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: Colors.light.primary,
                          lineHeight: 24,
                        }}
                        numberOfLines={2}
                      >
                        {parkingLot?.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 20,
                          color: Colors.light.subtitle,
                        }}
                        ellipsizeMode="tail"
                        numberOfLines={2}
                      >
                        {parkingLot.description &&
                          `Description: ${parkingLot?.description}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        flexDirection: "row",
                      }}
                    >
                      <ActionButton
                        action={handleCall}
                        icon={
                          <Ionicons
                            name="call-outline"
                            size={24}
                            color={Colors.light.primary}
                          />
                        }
                      />
                      <ActionButton
                        action={onClickFavorite}
                        icon={
                          favorite ? (
                            <Ionicons
                              name="heart"
                              size={24}
                              color={Colors.light.primary}
                            />
                          ) : (
                            <Ionicons
                              name="heart-outline"
                              size={24}
                              color={Colors.light.primary}
                            />
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={{ ...styles.flexRow, marginVertical: 12 }}>
                    <Feather
                      name="map-pin"
                      size={18}
                      color={Colors.light.heading}
                    />
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: Colors.light.heading,
                        lineHeight: 18,
                        width: "90%",
                        marginLeft: 12,
                      }}
                    >
                      {parkingLot?.address}
                    </Text>
                  </View>
                </View>
                <View style={{ ...styles.flexRow, marginVertical: 12 }}>
                  <View
                    style={{
                      backgroundColor: Colors.light.primary,
                      padding: 4,
                      borderRadius: 4,
                    }}
                  >
                    <MaterialIcons
                      name="directions-walk"
                      size={18}
                      color={Colors.light.background}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      marginHorizontal: 8,
                      color: Colors.light.heading,
                    }}
                  >
                    {Math.round(props.distance * 100) / 100}km
                  </Text>
                  <View
                    style={{
                      backgroundColor: Colors.light.primary,
                      padding: 5,
                      borderRadius: 4,
                      marginLeft: 24,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="parking"
                      size={16}
                      color={Colors.light.background}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      marginHorizontal: 8,
                      color: Colors.light.heading,
                    }}
                  >
                    {numOfAvailableSlots} slots available
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btnBook}
                  onPress={() => props.navigateBooking(parkingLot.id)}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: Colors.light.background,
                      textAlign: "center",
                    }}
                  >
                    View details
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>No data</Text>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  btnBook: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    height: 42,
    marginVertical: 12,
  },
  header: {
    backgroundColor: Colors.light.background,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: -1, height: -4 },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    paddingTop: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginBottom: 8,
    marginTop: 16,
  },
  flexRow: { display: "flex", flexDirection: "row", alignItems: "center" },
  actionButton: {
    height: 40,
    width: 40,
    backgroundColor: "#DBE0FB",
    borderRadius: 8,
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4D65EB",
    marginLeft: Spacing.s,
  },
});

export default DetailModal;
