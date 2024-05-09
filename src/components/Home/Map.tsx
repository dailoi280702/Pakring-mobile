import parkingLotApi from "@src/api/parkingLotApi";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import SearchAutocomplete, { MapLocation } from "./Search";
import {  StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
  onSelectedMarker: (p: ParkingLot) => void;
};

const Map = (props: Props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 10.879424639901684,
    longitude: 106.63844840942431,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentLocation, setCurrentLocation] = useState<MapLocation>({
    latitude: 0,
    longitude: 0,
  });
  const [locations, setLocations] = useState([]);
  const [parkings, setParkings] = useState<ParkingLot[]>([]);

  const handleSelectedSearchItem = (location: ParkingLot) => {
    const tmp = {
      ...location,
      longitude: Number(location.long),
      latitude: Number(location.lat),
    };

    if (!parkings.find((p) => p.id == location.id))
      setParkings((old) => [...old, location]);

    if (!locations.includes(tmp)) {
      var locationTmp = locations;
      locationTmp.push(tmp);
      setLocations(locationTmp);
      setRegion({
        ...region,
        longitude: location.long,
        latitude: location.lat,
      });
    }
  };

  useEffect(() => {
    const getCurrentLocationAndParkingLot = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const tmp = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: tmp.coords.latitude,
        longitude: tmp.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setCurrentLocation({
        latitude: tmp.coords.latitude,
        longitude: tmp.coords.longitude,
      });
    };
    getCurrentLocationAndParkingLot();
  }, []);

  useEffect(() => {
    (async () => {
      if (currentLocation.latitude != 0) {
        const result = await parkingLotApi.getAll({
          name: null,
          lat: currentLocation.latitude,
          long: currentLocation.longitude,
          distance: 10,
        });
        if (result.data.data.length > 0) {
          setParkings(result.data.data);
          const tmp = result.data.data.map((element: any) => {
            return {
              ...element,
              longitude: Number(element.long),
              latitude: Number(element.lat),
            };
          });
          setLocations(tmp);
        }
      }
    })();
  }, [currentLocation]);

  return (
    <>
      <SearchAutocomplete
        onSelected={handleSelectedSearchItem}
        currentLocation={currentLocation}
      />
      <MapView
        style={styles.map}
        region={region}
        provider="google"
        showsMyLocationButton
        showsUserLocation
      >
        {locations &&
          locations.map((e, index) => {
            return (
              <Marker
                coordinate={{ latitude: e.latitude, longitude: e.longitude }}
                key={`marker${index}`}
                onPress={() => {
                  props.onSelectedMarker(parkings[index]);
                  setRegion({ ...region, ...e });
                }}
              />
            );
          })}
      </MapView>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: "92%",
  },
});
