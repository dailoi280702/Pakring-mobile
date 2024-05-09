import { Colors } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any, any>;
};

const SignIn = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View>
          <Text style={styles.title}>Sign in</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primary,
    height: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
  },
});
export default SignIn;
