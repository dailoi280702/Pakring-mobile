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

const SignUp = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <Text>Sign up</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
