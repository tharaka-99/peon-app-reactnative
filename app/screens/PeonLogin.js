import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
  linkWithCredential,
} from "firebase/auth";
import { getApp } from "firebase/app";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { db } from "../firebase-config";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";

export default function PeonLogin() {
  const [email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const phoneInput = useRef();
  const [value, setValue] = useState("");
  const recaptchaVerifier = useRef("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = React.useState();
  const attemptInvisibleVerification = false;
  const [message, showMessage] = React.useState();

  useEffect(() => {
    const auth = getAuth();
    const subscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Document data id:", user.uid);

        const getDate = async (id) => {
          const docRef = await getDoc(doc(db, "registeredUser", id));

          if (docRef.exists()) {
            const myData = docRef.data();

            console.log("Document data:", docRef.data().worker_name);
            const worker_data = docRef.data();
            // console.log("Document data:", myData.role);
            if (myData.role === "admin") {
              console.log("ok");
              navigation.navigate("Admin Home");
            }
            if (myData.role === "staff") {
              console.log("ok");
              navigation.navigate("Staff Home", { worker_data });
            }
            if (myData.role === "peon") {
              console.log("ok");
              navigation.navigate("Peon Home", { worker_data });
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        };
        getDate(user.uid);
      }
    });
    return subscribe;
  });

  const signin = async () => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // return { user };
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const sendVerification = async () => {
    const auth = getAuth();
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      showMessage({
        text: "Verification code has been sent to your phone.",
      });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  const confirmCode = async () => {
    const auth = getAuth();
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      showMessage({ text: "Phone authentication successful 👍" });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          alignItems: "center",
          marginTop: 0,
        }}
      >
        <Image
          style={{
            width: 250,
            height: 250,
          }}
          source={require("../assets/Peon_App_Logo.png")}
        />
      </View>
      <TextInput
        style={styles.inputText}
        keyboardType="email-address"
        placeholder="Enter Email"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.inputText}
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={getApp().options}
        // attemptInvisibleVerification
      />

      {/* <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="LK"
        layout="first"
        // onChangeText={(text) => {
        //   setValue(text);
        // }}
        // onChangeFormattedText={(text) => {
        //   setFormattedValue(text);
        // }}
        // withDarkTheme
        // withShadow
        onChangeFormattedText={(text) => {
          setPhoneNumber(text);
        }}
        autoFocus
      />
      <TouchableOpacity onPress={sendVerification}>
        <Text>Send Verification</Text>
      </TouchableOpacity> */}
      {/* Verification Code Input */}
      {/* <TextInput
        placeholder="Confirmation Code"
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
      />
      <TouchableOpacity onPress={confirmCode}>
        <Text>Send Verification</Text>
      </TouchableOpacity>

      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: "center" },
          ]}
          onPress={() => showMessage(undefined)}
        >
          <Text
            style={{
              color: message.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />} */}

      <TouchableHighlight
        style={styles.button}
        activeOpacity={2}
        onPress={() => signin()}
        underlayColor="#0084fffa"
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Login
        </Text>
      </TouchableHighlight>

      {/* <TouchableHighlight
        style={styles.button}
        activeOpacity={2}
        onPress={() => {}}
        underlayColor="#0084fffa"
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#c8e2ff" }}>
          Register
        </Text>
      </TouchableHighlight> */}

      <View>
        <TouchableOpacity
          style={{
            fontWeight: "bold",
            margin: 10,
            alignItems: "flex-end",
          }}
        >
          {/* <Text
            style={{
              fontWeight: "600",
              opacity: 0.6,
              fontSize: 16,
            }}
          >
            Fogot Password?
          </Text> */}
        </TouchableOpacity>
      </View>

      {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{ marginVertical: 5 }}
          onPress={() => navigation.navigate("Peon Home", Password)}
        >
          <Text>Peon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginVertical: 5 }}
          onPress={() => navigation.navigate("Admin Home")}
        >
          <Text>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginVertical: 5 }}
          onPress={() => navigation.navigate("Staff Home")}
        >
          <Text>Staff</Text>
        </TouchableOpacity>
      </View> */}

      {/* <TouchableOpacity
        style={{
          width: "100%",

          backgroundColor: "#FFCDD2",
          height: 40,
          justifyContent: "center",
          opacity: 0.5,
        }}
        onPress={() => alert("Google...")}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../assets/google.png")}
            style={{ width: 30, height: 30, marginHorizontal: 50 }}
          ></Image>
          <View style={{}}>
            <Text
              style={{
                color: "#F44336",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Sign In With Google
            </Text>
          </View>
        </View>
      </TouchableOpacity> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            opacity: 0.6,
            fontSize: 16,
            color: "#1565C0",
          }}
        >
          Don't have account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Create Account")}>
          <Text
            style={{
              fontWeight: "bold",
              opacity: 0.6,
              fontSize: 16,
              color: "#1565C0",
            }}
          >
            Create account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    padding: 15,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  inputText: {
    // backgroundColor:"#EDE7F6",

    borderColor: "#67afff",
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#448AFF",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
});
