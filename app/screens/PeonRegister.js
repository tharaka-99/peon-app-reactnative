import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Keyboard,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { Avatar } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import Input from "./CustomComponent/Input";

export default function PeonRegister() {
  const navigation = useNavigation();
  const peonCollectinRef = collection(db, "peon");
  const [peon, setPeon] = useState({
    peon_service_id: "",
    peon_name: "",
    peon_deparment: "",
    peon_phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!peon.peon_service_id) {
      handleError("Please input id", "peon_service_id");
      isValid = false;
    }
    if (!peon.peon_name) {
      handleError("Please input Employee Name", "peon_name");
      isValid = false;
    }
    if (!peon.peon_deparment) {
      handleError("Please input Department", "peon_deparment");
      isValid = false;
    }
    if (!peon.email) {
      handleError("Please input Email", "email");
      isValid = false;
    } else if (!peon.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }
    if (!peon.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (peon.password.length < 8) {
      handleError("Min password length of 8", "password");
      isValid = false;
    }
    if (!peon.peon_phone) {
      handleError("Please input Phone number", "peon_phone");
      isValid = false;
    } else if (peon.peon_phone.length != 10) {
      handleError("Add 10 numbers", "peon_phone");
      isValid = false;
    }
    if (isValid) {
      savePeon();
    }
  };

  const handleChangeText = (name, value) => {
    setPeon({ ...peon, [name]: value });
  };

  const handleError = (error, peon) => {
    setErrors((prevState) => ({ ...prevState, [peon]: error }));
  };

  const savePeon = async () => {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, peon.email, peon.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "registeredUser", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          peon_service_id: peon.peon_service_id,
          peon_name: peon.peon_name,
          peon_deparment: peon.peon_deparment,
          peon_phone: peon.peon_phone,
          role: "peon",
          email: peon.email,
        });
        setDoc(doc(db, "peon", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          peon_service_id: peon.peon_service_id,
          peon_name: peon.peon_name,
          peon_deparment: peon.peon_deparment,
          peon_phone: peon.peon_phone,
          role: "peon",
          email: peon.email,
        });
        ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
      })
      //   .then((userCredential) => {
      //     const user = userCredential.user;
      //     // console.log(user.uid);
      //     // return { user };

      //   })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
    // ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
    // alert("created...");

    // location.reload();

    // reload(true);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textPeonRegister}>Peon Register</Text>
      <Text style={styles.textDetails}>Enter Your Details to Register</Text>

      <ScrollView>
        <Input
          onChangeText={(val) => handleChangeText("peon_service_id", val)}
          onFocus={() => handleError(null, "peon_service_id")}
          //iconName="email-outline"
          label="Employee ID"
          placeholder="Enter Employee ID"
          error={errors.peon_service_id}
        />
        <Input
          onChangeText={(val) => handleChangeText("peon_name", val)}
          onFocus={() => handleError(null, "peon_name")}
          //iconName="email-outline"
          label="Employee name"
          placeholder="Enter Employee name"
          error={errors.peon_name}
        />
        <Input
          onChangeText={(val) => handleChangeText("peon_deparment", val)}
          onFocus={() => handleError(null, "peon_deparment")}
          //iconName="email-outline"
          label="Department"
          placeholder="Enter Department"
          error={errors.peon_deparment}
        />
        <Input
          keyboardType="phone-pad"
          onChangeText={(val) => handleChangeText("peon_phone", val)}
          onFocus={() => handleError(null, "peon_phone")}
          //iconName="email-outline"
          label="Phone Number"
          placeholder="Enter Phone number"
          error={errors.peon_phone}
        />

        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            opacity: 0.5,
            marginVertical: 10,
          }}
        >
          Enter Your Login Details:
        </Text>
        <Input
          keyboardType="email-address"
          onChangeText={(val) => handleChangeText("email", val)}
          onFocus={() => handleError(null, "email")}
          //iconName="email-outline"
          label="Email"
          placeholder="Enter Email"
          error={errors.email}
        />
        <Input
          secureTextEntry
          onChangeText={(val) => handleChangeText("password", val)}
          onFocus={() => handleError(null, "password")}
          //iconName="email-outline"
          label="Password"
          placeholder="Enter password"
          error={errors.password}
        />

        <TouchableHighlight
          style={{
            marginTop: 20,
            backgroundColor: "#0056A2",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          activeOpacity={2}
          onPress={validate}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#c8e2ff" }}>
            Register
          </Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flex: 1,
  },
  touchAddPhoto: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#67afff",
    height: 100,
    width: 100,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textPeonRegister: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textDetails: {
    fontSize: 16,
    opacity: 0.5,
  },
  inputText: {
    borderColor: "#67afff",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
