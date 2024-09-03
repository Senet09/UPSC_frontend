import React, { useState, createRef } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Color,
  FontFamily,
  FontSize,
  Border,
  Padding,
} from "../styles/GlobalStyles";
import Loader from "../components/Loader";
import Icon from 'react-native-vector-icons/Ionicons';
const Signup1 = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext("");
    if (!firstName) {
      alert("Please fill First Name");
      return;
    }
    if (!lastName) {
      alert("Please fill Last Name");
      return;
    }
    if (!email) {
      alert("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    //Show Loader
    setLoading(true);

    fetch("https://d2jju2h99p6xsl.cloudfront.net/api/v1/addUser", {
      method: "POST",
      body: JSON.stringify({

        firstName,
        lastName,
        email,
        password,
      }),
      headers: {
        //Header Defination
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.success) {
          setIsRegistraionSuccess(true);
          setModalVisible(true);
          console.log("Registration Successful. Please Login to proceed");

        } else {
          setErrortext(responseJson.message);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.iconarrowLeft}
          onPress={() => navigation.navigate("LoginSc")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../../assets/image/iconarrowleft.png")}
          />

        </Pressable>
      </View>
    );
  };



  const handleModalButton = () => {
    setModalVisible(false);
    setIsRegistraionSuccess(false);
    navigation.navigate('LoginSc');
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Loader loading={loading} />
      <View style={styles.parentContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon name="checkmark-circle" size={64} color="green" />
              <Text style={styles.modalText}>Registration Successful</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleModalButton}
              >
                <Text style={styles.modalButtonText}>Login Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.contentContainer}>
            <View style={styles.textfield}>
              <Text style={[styles.header, styles.signUpText]}>Sign up</Text>
              {errortext != "" ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}
              <Text style={[styles.header, styles.signUpTypo]}>First Name</Text>
              <View style={styles.placeHolderWrapper}>
                <TextInput
                  style={[styles.placeHolder, styles.placeTypo]}
                  placeholder="Your First Name"
                  placeholderTextColor={Color.textPlaceholder}
                  onChangeText={setFirstName}
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.textfield}>
              <Text style={[styles.header, styles.signUpTypo]}>Last Name</Text>
              <View style={styles.placeHolderWrapper}>
                <TextInput
                  style={[styles.placeHolder, styles.placeTypo]}
                  placeholder="Your Last Name"
                  placeholderTextColor={Color.textPlaceholder}
                  onChangeText={setLastName}
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.textfield}>
              <Text style={[styles.header, styles.signUpTypo]}>E-mail</Text>
              <View style={styles.placeHolderWrapper}>
                <Image
                  style={styles.iconmailLayout}
                  resizeMode="cover"
                  source={require("../../assets/image/iconmail.png")}
                />
                <TextInput
                  style={[styles.placeHolder, styles.placeTypo]}
                  placeholder="Your Email"
                  onChangeText={setEmail}
                  placeholderTextColor={Color.textPlaceholder}
                  keyboardType="email-address"
                  ref={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={styles.textfield}>
              <Text style={[styles.header, styles.signUpTypo]}>Password</Text>
              <View style={styles.placeHolderWrapper}>
                <Image
                  style={styles.iconmailLayout}
                  resizeMode="cover"
                  source={require("../../assets/image/iconlock.png")}
                />
                <TextInput
                  style={[styles.placeHolder, styles.placeTypo]}
                  placeholder="Your Password"
                  placeholderTextColor={Color.textPlaceholder}
                  onChangeText={setPassword}
                  ref={passwordInputRef}
                  returnKeyType="next"
                  secureTextEntry={!passwordVisible}
                  onSubmitEditing={() =>
                    ageInputRef.current && ageInputRef.current.focus()
                  }
                  blurOnSubmit={false}
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

            <View>
              <Text style={styles.bySigningUpContainer}>
                <Text style={styles.bySigningUp}>
                  By signing up you agree to our{" "}
                </Text>
                <Text style={styles.termsCondition}>Terms & Condition</Text>
                <Text style={styles.bySigningUp}> and </Text>
                <Text style={styles.termsCondition}>Privacy Policy.</Text>
                <Text style={styles.text}>*</Text>
              </Text>
            </View>
            <Pressable style={styles.button} onPress={handleSubmitButton}>
              <Text style={styles.buttonLabel}>Signup</Text>
            </Pressable>
            <Pressable
              style={styles.alreadySignedUpParent}
              onPress={() => navigation.navigate("LoginSc")}
            >
              <Text style={[styles.alreadySignedUp, styles.placeTypo]}>
                Already signed up ?
              </Text>
              <Text style={[styles.login, styles.placeTypo]}>Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Color.white,
  },
  container: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: Color.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: Color.darkslateblue,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  headerContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 24,

  },
  signUpTypo: {
    textAlign: "left",
    color: Color.textPrimary,
    fontFamily: FontFamily.gilroySemibold,
    fontSize: 16,
    fontWeight: "600",
  },
  signUpText: {
    textAlign: "left",
    color: Color.textPrimary,
    fontFamily: FontFamily.gilroySemibold,
    fontWeight: "600",
    fontSize: FontSize.size_9xl,
    marginBottom: 30
  },
  contentContainer: {
    justifyContent: "center",
  },
  placeTypo: {
    fontFamily: FontFamily.gilroyMedium,
    fontWeight: "bold",
    fontSize: 16,
    color: Color.textPlaceholder,
    textAlign: "left",
  },
  iconmailLayout: {
    height: 16,
    width: 16,
    marginRight: 10,
  },
  header: {
    fontSize: 16,
  },
  placeHolderWrapper: {
    borderRadius: Border.br_9xs,
    borderStyle: "solid",
    borderColor: "#a2a2a6",
    borderWidth: 1,
    height: 43,
    fontWeight: "1000",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_4xs,
    marginTop: 6,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  textfield: {
    marginBottom: 18,
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
  placeHolder: {
    color: Color.textPlaceholder,
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  iconeyeOff: {
    marginLeft: 10,
  },
  bySigningUp: {
    color: Color.textPlaceholder,
  },
  termsCondition: {
    color: Color.textPrimary,
  },
  text: {
    color: Color.blue,
  },
  bySigningUpContainer: {
    marginTop: 17,
    fontSize: FontSize.size_sm,
  },
  alreadySignedUp: {
    color: Color.textPlaceholder,
    fontSize: FontSize.size_xs,
    fontWeight: "500",
  },
  login: {
    marginLeft: 4,
    color: Color.blue,
    fontSize: FontSize.size_xs,
    fontWeight: "500",
  },

  alreadySignedUpParent: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 16,
  },
  buttonLabel: {
    color: Color.white,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.gilroySemibold,
    fontWeight: "600",
  },

  button: {
    borderRadius: Border.br_7xs,
    backgroundColor: Color.darkslateblue,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_smi,
    justifyContent: "center",
    alignSelf: "center",
    width: windowWidth - 48,
    marginBottom: 16,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  iconarrowLeft: {
    width: 24,
    height: 24,
  },
  signup: {
    height: 844,
    flex: 1,
    backgroundColor: Color.white,
  },
  errorTextStyle: {
    color: "red"
  }
});

export default Signup1;
