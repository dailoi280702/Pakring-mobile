import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParams } from "@src/navigation/AppNavigator/types";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

type Props = NativeStackScreenProps<AppStackParams, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
});
