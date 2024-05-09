import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any, any>;
};

const SignUp = (props: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (values: any) => {
    setIsLoading(true);
    props.navigation.navigate("Verification", {
      user: values,
      type: "SignUp",
      phoneNumber: "",
    });
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                passwordConfirm: "",
              }}
              onSubmit={(values) => handleSignUp(values)}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.containerInput}>
                    <View style={styles.groupInput}>
                      <MaterialCommunityIcons
                        name="account-outline"
                        size={24}
                        style={styles.icon}
                      />
                      <TextInput
                        onChangeText={handleChange("name")}
                        placeholder="Enter name"
                        placeholderTextColor="#CBD5E1"
                        value={values.name}
                        style={styles.input}
                      />
                      <View style={{ width: 22 }} />
                    </View>
                    {errors.name && touched.name && (
                      <Text style={styles.validateError}>* {errors.name}</Text>
                    )}
                    <View style={styles.groupInput}>
                      <MaterialIcons
                        name="mail-outline"
                        size={22}
                        style={styles.icon}
                      />
                      <TextInput
                        onChangeText={handleChange("email")}
                        placeholder="parka@gmail.com"
                        placeholderTextColor="#CBD5E1"
                        value={values.email}
                        style={styles.input}
                        keyboardType="email-address"
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text style={styles.validateError}>* {errors.email}</Text>
                    )}
                    <View style={styles.groupInput}>
                      <Feather name="phone" size={24} style={styles.icon} />
                      <TextInput
                        onChangeText={handleChange("phoneNumber")}
                        placeholder="Phone number"
                        placeholderTextColor="#CBD5E1"
                        value={values.phoneNumber}
                        style={styles.input}
                        maxLength={10}
                        keyboardType="numeric"
                      />
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
                        style={styles.icon}
                      />
                      <TextInput
                        onChangeText={handleChange("password")}
                        placeholder="Enter password"
                        placeholderTextColor="#CBD5E1"
                        secureTextEntry={secureTextEntry}
                        value={values.password}
                        style={styles.input}
                      />
                      <Octicons
                        name={secureTextEntry ? "eye" : "eye-closed"}
                        size={22}
                        style={styles.icon}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                      />
                    </View>
                    {errors.password && touched.password && (
                      <Text style={styles.validateError}>
                        * {errors.password}
                      </Text>
                    )}
                    <View style={styles.groupInput}>
                      <MaterialCommunityIcons
                        name="key-outline"
                        size={22}
                        style={styles.icon}
                      />
                      <TextInput
                        onChangeText={handleChange("passwordConfirm")}
                        placeholder="Re-enter password"
                        placeholderTextColor="#CBD5E1"
                        value={values.passwordConfirm}
                        style={styles.input}
                        secureTextEntry={secureTextEntry}
                      />
                      <Octicons
                        name={secureTextEntry ? "eye" : "eye-closed"}
                        size={22}
                        style={styles.icon}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                      />
                    </View>
                    {errors.passwordConfirm && touched.passwordConfirm && (
                      <Text style={styles.validateError}>
                        * {errors.passwordConfirm}
                      </Text>
                    )}
                  </View>
                  <AppButton
                    style={styles.btnNext}
                    isLoading={isLoading}
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      Next
                    </Text>
                  </AppButton>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginTop: 10,
    marginBottom: 20,
  },
  containerInput: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  groupInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#90A3BC",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.light.text,
  },
  btnNext: {
    height: 56,
    margin: 20,
    marginTop: 40,
    justifyContent: "center",
  },
  icon: {
    color: Colors.light.text,
  },
  validateError: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginBottom: -10,
  },
});
