import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
};

const Verification = (props: Props) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Enter verify code</Text>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
});
