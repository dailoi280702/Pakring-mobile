import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import { Formik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any, any>;
};
type LoginValue = {
  phoneNumber: string;
  password: string;
};

const SignIn = (props: Props) => {
  const [isRemember, setIsRemember] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const formikRef = useRef<FormikProps<LoginValue>>();

  const toggleSwitch = async () =>
    setIsRemember((previousState) => !previousState);

  const login = async (values: any) => {
    props.navigation.navigate("App");
  };

  useEffect(() => {
    const saveIntoAsyncStorage = async () => {
      if (formikRef.current) {
        const phoneNumber = await AsyncStorage.getItem("phoneNumber");
        const password = await AsyncStorage.getItem("password");
        formikRef.current.setFieldValue("phoneNumber", phoneNumber);
        formikRef.current.setFieldValue("password", password);
      }
    };
    saveIntoAsyncStorage();
  }, [formikRef]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={{ height: "20%", justifyContent: "center" }}>
          <Text style={styles.title}>Sign in</Text>
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={{ phoneNumber: "", password: "" }}
          onSubmit={(values) => login(values)}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View style={styles.controller}>
              <View style={styles.containerInput}>
                <View style={styles.groupInput}>
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={22}
                    color={Colors.light.text}
                  />
                  <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#CBD5E1"
                    onChangeText={handleChange("phoneNumber")}
                    value={values.phoneNumber}
                    keyboardType="number-pad"
                    style={styles.input}
                  />
                  <View style={{ width: 22 }} />
                </View>
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.validateError}>
                    * {errors.phoneNumber}
                  </Text>
                )}
                <View style={styles.groupInput}>
                  <MaterialCommunityIcons
                    name="key-outline"
                    size={22}
                    color={Colors.light.text}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#CBD5E1"
                    onChangeText={handleChange("password")}
                    value={values.password}
                    style={styles.input}
                    secureTextEntry={hidePassword}
                  />
                  <Octicons
                    name={hidePassword ? "eye" : "eye-closed"}
                    size={22}
                    color={Colors.light.text}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.validateError}>* {errors.password}</Text>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Switch
                  trackColor={{
                    false: "#FFF",
                    true: Colors.light.tabIconSelected,
                  }}
                  thumbColor={isRemember ? "#FFF" : "#8F8F9D"}
                  onValueChange={toggleSwitch}
                  value={isRemember}
                  style={styles.switch}
                />
                <Text
                  style={{
                    color: Colors.light.text,
                    marginLeft: 5,
                  }}
                >
                  Remember me
                </Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    props.navigation.navigate("ResetPassword");
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: Colors.light.text,
                      fontWeight: "700",
                    }}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
              <AppButton style={styles.btnSignIn} onPress={handleSubmit}>
                <Text
                  style={{ fontSize: 22, fontWeight: "600", color: "white" }}
                >
                  Sign in
                </Text>
              </AppButton>
              <View style={styles.oauth}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("SignUp");
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.light.primary,
                        fontSize: 16,
                        fontWeight: "800",
                        marginLeft: 10,
                      }}
                    >
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
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
  controller: {
    height: "80%",
    width: "100%",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 90,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
  },
  containerInput: {
    width: "100%",
  },
  groupInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#90A3BC",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.light.text,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
  },
  btnSignIn: {
    marginTop: 70,
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.8 }],
    paddingLeft: 0,
    marginLeft: 0,
    marginTop: 5,
  },
  oauth: {
    width: "100%",
    marginTop: 20,
  },
  btnOauth: {
    backgroundColor: "#FFF",
    color: Colors.light.text,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 10,
  },
  iconOauth: {
    marginRight: 10,
  },
  validateError: {
    color: "red",
    fontSize: 14,
    marginTop: 2,
    marginBottom: -12,
  },
});
export default SignIn;
