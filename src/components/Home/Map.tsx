import parkingLotApi from "@src/api/parkingLotApi";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import SearchAutocomplete, { MapLocation } from "./Search";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Colors } from "@src/constants";
import config from "@src/config";

type Props = {
  onSelectedMarker: (p: ParkingLot) => void;
  setDistance: (d: number) => void;
  menuOption: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (_: boolean) => void;
};

const GgMap = (props: Props) => {
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
  const [filteredParkingLots, SetFilteredParkingLots] = useState<ParkingLot[]>(
    [],
  );
  const [destination, setDestination] = useState();
  const [mapInfo, setMapInfo] = useState<Map<string, ParkingLotInfo>>(
    {} as Map<string, ParkingLotInfo>,
  );

  useEffect(() => {
    try {
      parkingLotApi
        .getListInfo(parkings.map((p) => p.id))
        .then((res) => {
          const data = res.data.data as ParkingLotInfo[];
          var tmp = new Map();

          data.forEach((v) => tmp.set(v.id, v));
          setMapInfo(tmp);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, [parkings]);

  useEffect(() => {
    if (parkings.length == 0 || !mapInfo) return;

    if (props.menuOption == 2) {
      const tmp = parkings.filter((v) => {
        const info = mapInfo.get(v.id);

        return info && info.totalSlots > info.bookedSlots;
      });
      SetFilteredParkingLots(tmp);
      return;
    }

    SetFilteredParkingLots(parkings);
  }, [parkings, mapInfo, props.menuOption]);

  const handleSelectedSearchItem = (location: ParkingLot) => {
    const tmp = {
      ...location,
      longitude: Number(location.long),
      latitude: Number(location.lat),
    };

    if (!parkings.find((p) => p.id == location.id)) {
      setParkings((old) => [...old, location]);
    }

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

    props.onSelectedMarker(location);
  };

  useEffect(() => {
    const getCurrentLocationAndParkingLot = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
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
    const tmp = filteredParkingLots.map((element: any) => {
      return {
        ...element,
        longitude: Number(element.long),
        latitude: Number(element.lat),
      };
    });
    setLocations(tmp);
  }, [filteredParkingLots]);

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
          // const tmp = result.data.data.map((element: any) => {
          //   return {
          //     ...element,
          //     longitude: Number(element.long),
          //     latitude: Number(element.lat),
          //   };
          // });
          // setLocations(tmp);
        }
      }
    })();
  }, [currentLocation]);

  return (
    <>
      <SearchAutocomplete
        onSelected={handleSelectedSearchItem}
        currentLocation={currentLocation}
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
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
                  if (parkings[index]) {
                    props.onSelectedMarker(parkings[index]);
                    setRegion({ ...region, ...e });
                    setDestination(e);
                  }
                }}
              />
            );
          })}

        {destination && (
          <MapViewDirections
            origin={currentLocation}
            destination={destination}
            apikey={config.MAP_API_KEY}
            strokeWidth={4}
            strokeColor={Colors.light.primary}
            optimizeWaypoints={true}
            onReady={({ distance }) => {
              props.setDistance(distance);
            }}
          />
        )}
      </MapView>
    </>
  );
};

export default GgMap;

const styles = StyleSheet.create({
  map: {
    height: "92%",
  },
});
