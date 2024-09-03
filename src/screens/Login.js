
import React, { useContext, useState, createRef } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../styles/GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import AuthContext from '../authentication/authContext';
const LoginSc = () => {
  const { updateUser } = useContext(AuthContext)
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = async () => {
    setErrortext("");
    if (!email) {
      console.log("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    let dataToSend = { email: email, password: password };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    try {
      const response = await fetch(`https://d2jju2h99p6xsl.cloudfront.net/api/v1/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      setLoading(false);
      console.log(responseJson);
      if (responseJson.existUser && responseJson.existUser.email === email) {
        await AsyncStorage.setItem('authToken', responseJson.token);
        await AsyncStorage.setItem('userEmail', responseJson.existUser.email);
        await AsyncStorage.setItem('firstName', responseJson.existUser.firstName)
        await AsyncStorage.setItem('lastName', responseJson.existUser.lastName)
        await AsyncStorage.setItem('id', responseJson.existUser._id)
        const usertoken = responseJson.token;
        console.log(responseJson.token)
        console.log(responseJson.existUser._id)
        const tkn = await AsyncStorage.getItem('authToken');
        const eml = await AsyncStorage.getItem('userEmail');
        const frn = await AsyncStorage.getItem('firstName');
        const id = await AsyncStorage.getItem('id');
        console.log(eml, frn, id)
        updateUser({ usertoken });
        navigation.replace("TabNavigator");
      } else {
        setErrortext("Please check your email id or password");
        console.log("Please check your email id or password");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <View style={styles.login}>
      <Loader loading={loading} />
      <Text style={styles.login1}>Login</Text>
      <View style={styles.frameParent}>
        <View>
          <View style={styles.textfield}>
            <Text style={styles.header}>E-mail/Phone</Text>
            <View style={[styles.iconmailParent, styles.parentFlexBox]}>
              <Image
                style={styles.iconmailLayout}
                resizeMode="cover"
                source={require("../../assets/image/iconmail.png")}
              />
              <TextInput
                style={[styles.placeHolder, styles.rememberMeTypo]}
                onChangeText={(userName) => setEmail(userName)}
                placeholder="Your Email"
                placeholderTextColor={Color.textPlaceholder}
                parentFlexBox={styles.placeHolder}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
          </View>
          <View style={styles.textfield1}>
            <Text style={styles.header}>Password</Text>
            <View style={[styles.iconmailParent, styles.parentFlexBox]}>
              <Image
                style={styles.iconmailLayout}
                resizeMode="cover"
                source={require("../../assets/image/iconlock.png")}
              />
              <TextInput
                style={[styles.placeHolder, styles.rememberMeTypo]}
                onChangeText={(UserPassword) => setPassword(UserPassword)}
                placeholder="Your Password"
                secureTextEntry={!passwordVisible}
                placeholderTextColor={Color.textPlaceholder}
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  style={[styles.iconeyeOff, styles.iconmailLayout]}
                  resizeMode="cover"
                  source={
                    passwordVisible
                      ? require("../../assets/image/view.png")
                      : require("../../assets/image/iconeyeoff.png")
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {errortext != "" ? (
          <Text style={styles.errorTextStyle}>{errortext}</Text>
        ) : null}
        <View style={styles.frameGroup}>

          <Text style={[styles.forgotPassword, styles.signupTypo]}>Forgot Password?</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmitPress}>
        <Text style={[styles.buttonLabel, styles.buttonLabelTypo]}>Login</Text>
      </TouchableOpacity>
      <View style={[styles.vectorParent, styles.parentFlexBox]}>
        <Image
          style={styles.frameLayout}
          resizeMode="cover"
          source={require("../../assets/image/vector2.png")}
        />
        <Text style={[styles.orContinueWith, styles.rememberMeTypo]}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup1")}>
          <Text style={[styles.signup2, styles.signupTypo]}>Signup</Text>
        </TouchableOpacity>
        <Image
          style={[styles.frameItem, styles.frameLayout]}
          resizeMode="cover"
          source={require("../../assets/image/vector3.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  rememberMeTypo: {
    fontFamily: FontFamily.gilroyMedium,
    fontWeight: 'bold',

    fontSize: 12,
    color: '#000',
    textAlign: "left",
  },
  iconmailLayout: {
    height: 16,
    width: 16,
    overflow: "hidden",
  },
  signupTypo: {
    color: '#000',
    fontFamily: FontFamily.gilroyMedium,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  buttonLabelTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
    fontFamily: FontFamily.gilroySemibold,
    fontWeight: "600",
  },
  frameLayout: {
    height: 2,
    maxWidth: "100%",
    overflow: "hidden",
    flex: 1,
  },
  signupBorder: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_lg,
    borderColor: '#000',
    borderRadius: Border.br_7xs,
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.white,
  },
  login1: {
    top: 110,
    fontSize: FontSize.size_9xl,
    textAlign: "center",
    color: Color.textPrimary,
    fontFamily: FontFamily.gilroySemibold,
    fontWeight: "600",
    left: 24,
    position: "absolute",
  },
  header: {
    textAlign: "left",
    fontSize: 16,
    color: '#000',
    fontFamily: FontFamily.gilroySemibold,
    fontWeight: "600",
  },
  placeHolder: {
    marginLeft: 10,
    color: '#000',
    flex: 1,
  },
  iconmailParent: {
    alignSelf: "stretch",
    borderColor: "#a2a2a6",
    height: 43,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_10xs,
    marginTop: 6,
    borderWidth: 1,
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: Border.br_9xs,
    backgroundColor: Color.white,
  },
  textfield: {
    width: 350,
  },
  iconeyeOff: {
    marginLeft: 10,
  },
  textfield1: {
    marginTop: 18,
    width: 350,
    flexWrap: "wrap",
  },
  checkbox: {
    borderColor: "#667085",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: Border.br_9xs,
    width: 16,
    backgroundColor: Color.white,
  },
  rememberMe: {
    marginLeft: 8,
    color: '#000',
  },
  forgotPassword: {
    marginLeft: 139,
  },
  frameGroup: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  frameParent: {
    top: 180,
    alignItems: "flex-end",
    left: 24,
    position: "absolute",
  },
  dontHaveAn: {
    color: '#000',
  },
  signup: {
    marginLeft: 4,
  },
  dontHaveAnAccountParent: {
    top: 789,
    left: 107,
    flexDirection: "row",
    backgroundColor: "red",
    height: 20,
    width: 200,
  },
  buttonLabel: {
    color: Color.white,
    flex: 1,
  },
  button: {
    top: 427,
    backgroundColor: Color.darkslateblue,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_smi,
    justifyContent: "center",
    borderRadius: Border.br_7xs,
    alignItems: "center",
    flexDirection: "row",
    width: 350,
    left: 24,

    position: "absolute",
  },
  orContinueWith: {
    marginLeft: 5,
    marginRight: 5,
    color: Color.textPlaceholder,
    fontSize: FontSize.size_xs,
    fontWeight: "700",
  },
  frameItem: {
    marginLeft: 12,
  },
  vectorParent: {
    top: 530,
    left: 38,
    width: 315,
    position: "absolute",
  },
  logofacebook1Icon: {
    width: 36,
    height: 36,
    overflow: "hidden",
  },
  signup2: {
    marginLeft: 5,
    fontSize: 16
  },
  signupParent: {
    top: 567,
    left: 63,
    flexDirection: "row",
    position: "absolute",
  },
  login: {
    width: "100%",
    height: 844,
    overflow: "hidden",
    flex: 1,
    backgroundColor: Color.white,
  },
  errorTextStyle: {
    color: "red"
  }
});

export default LoginSc;
