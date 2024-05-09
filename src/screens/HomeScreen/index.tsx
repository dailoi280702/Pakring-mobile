import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParams } from "@src/navigation/AppNavigator/types";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "react-native";
import Map from "@src/components/Home/Map";

type Props = NativeStackScreenProps<AppStackParams, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Map></Map>
        <Text>Home</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
});
