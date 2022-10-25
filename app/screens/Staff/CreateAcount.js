import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../firebase-config";
import SelectList from "react-native-dropdown-select-list";
import Input from "../CustomComponent/Input";

import { useNavigation } from "@react-navigation/native";

export default function CreateAcount() {
  const navigation = useNavigation();
  const [staff, setStaff] = useState({
    staff_service_id: "",
    staff_name: "",
    staff_deparment: "",
    staff_phone: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [selected, setSelected] = useState("");

  const data = [
    { key: "0", value: "SLT" },
    { key: "1", value: "Mobitel" },
    { key: "2", value: "SLTMobitel" },
  ];

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!staff.staff_service_id) {
      handleError("Please input id", "staff_service_id");
      isValid = false;
    }
    // else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
    //   handleError("Please input a valid email", "email");
    //   isValid = false;
    // }
    if (!staff.staff_name) {
      handleError("Please input Employee Name", "staff_name");
      isValid = false;
    }
    if (!staff.staff_deparment) {
      handleError("Please input Department", "staff_deparment");
      isValid = false;
    }
    if (!staff.staff_phone) {
      handleError("Please input Phone number", "staff_phone");
      isValid = false;
    } else if (staff.staff_phone.length != 10) {
      handleError("Add 10 numbers", "staff_phone");
      isValid = false;
    }
    if (!staff.username) {
      handleError("Please input Username", "username");
      isValid = false;
    }
    if (!staff.email) {
      handleError("Please input Email", "email");
      isValid = false;
    } else if (!staff.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }
    if (!staff.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (staff.password.length < 8) {
      handleError("Min password length of 8", "password");
      isValid = false;
    }
    if (isValid) {
      SaveUser();
    }
  };

  const handleError = (error, staff) => {
    setErrors((prevState) => ({ ...prevState, [staff]: error }));
  };

  const handleChangeText = (staff, value) => {
    setStaff((prevState) => ({ ...prevState, [staff]: value }));
  };

  const SaveUser = async () => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, staff.email, staff.password)
      .then(() => {
        setDoc(doc(db, "registeredUser", auth.currentUser.uid), {
          staff_service_id: staff.staff_service_id,
          staff_name: staff.staff_name,
          staff_deparment: data[selected].value,
          staff_phone: staff.staff_phone,
          uid: auth.currentUser.uid,
          role: "staff",
          email: staff.email,
          username: staff.username,
        });
        setDoc(doc(db, "staff", auth.currentUser.uid), {
          staff_service_id: staff.staff_service_id,
          staff_name: staff.staff_name,
          staff_deparment: data[selected].value,
          staff_phone: staff.staff_phone,
          uid: auth.currentUser.uid,
          role: "staff",
          email: staff.email,
          username: staff.username,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });

    ToastAndroid.show(
      staff.staff_name + " Request sent successfully!",
      ToastAndroid.SHORT
    );
  };

  return (
    <ScrollView style={{ padding: 15, flex: 1 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Staff Register</Text>
      <Text style={{ opacity: 0.5, fontSize: 16, marginBottom: 15 }}>
        Enter Your Details to Register
      </Text>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Input
          onChangeText={(val) => handleChangeText("staff_service_id", val)}
          onFocus={() => handleError(null, "staff_service_id")}
          //iconName="email-outline"
          label="Enter Employee ID"
          placeholder="Enter Employee ID"
          error={errors.staff_service_id}
        />
        <Input
          onChangeText={(val) => handleChangeText("staff_name", val)}
          onFocus={() => handleError(null, "staff_name")}
          //iconName="email-outline"
          label="Employee Name"
          placeholder="Enter Employee Name"
          error={errors.staff_name}
        />
        <Text style={{ opacity: 0.6, marginBottom: 3 }}>Department</Text>

        <SelectList
          boxStyles={{
            backgroundColor: "#fff",
            // marginVertical: 5,
            borderColor: "#90CAF9",
            borderWidth: 2,
            borderRadius: 10,
            // padding: 5,
            // opacity: 0.5,
            paddingLeft: 10,
          }}
          inputStyles={{ opacity: 0.5 }}
          placeholder="Enter Depatment"
          setSelected={setSelected}
          data={data}
        />
        <Input
          keyboardType="phone-pad"
          onChangeText={(val) => handleChangeText("staff_phone", val)}
          onFocus={() => handleError(null, "staff_phone")}
          //iconName="email-outline"
          label="Phone Number"
          placeholder="Enter Phone number"
          error={errors.staff_phone}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            opacity: 0.6,

            marginVertical: 13,
          }}
        >
          Enter Your Login Details:
        </Text>
        <Input
          onChangeText={(val) => handleChangeText("username", val)}
          onFocus={() => handleError(null, "username")}
          //iconName="email-outline"
          label="Username"
          placeholder="Enter Username"
          error={errors.username}
        />

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
          placeholder="Enter Password"
          error={errors.password}
        />

        <View></View>
        <TouchableOpacity
          style={styles.button}
          onPress={validate}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Create Account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            padding: 5,
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              opacity: 0.6,
              fontSize: 16,
              color: "#1565C0",
            }}
          >
            Already got an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontWeight: "bold",
                opacity: 0.6,
                fontSize: 16,
                color: "#1565C0",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#0056A2",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
});
