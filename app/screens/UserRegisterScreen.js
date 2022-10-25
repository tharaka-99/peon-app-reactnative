import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserRegisterScreen() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textRegister}>Register</Text>
      <Text style={styles.textDetails}>Enter Your Details to Register</Text>
      <ScrollView>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Name"
        ></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Name"
        ></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Name"
        ></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Name"
        ></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Name"
        ></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Name"
        ></TextInput>

        <View style={styles.rowContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter Email Address"
          ></TextInput>
          <TextInput style={styles.inputText} placeholder="Enter Phone Number">
            <MaterialCommunityIcons
              name="email"
              size={20}
              placeholder="Enter Phone Number"
            />
          </TextInput>
        </View>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Password"
        ></TextInput>
        <Button title="Press me" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flex: 1,
  },
  textRegister: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textDetails: {
    color: "#423F3E",
    opacity: 0.5,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  inputText: {
    // backgroundColor:"#EDE7F6",

    borderColor: "#BBBBBB",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
  },
  image: {
    width: 5,
    height: 5,
  },
  button: {
    margin: 10,
  },
});
