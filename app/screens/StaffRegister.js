import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function StaffRegister() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textPeonRegister}>Register</Text>
      <Text style={styles.textDetails}>Enter Your Details to Register</Text>

      <ScrollView>
        <TouchableOpacity style={styles.touchAddPhoto}>
          <Text
            style={{
              opacity: 0.5,
            }}
          >
            Add Profile Picture
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.inputText}
          placeholder="Enter Employee ID"
        ></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Employee Name"
        ></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Department"
        ></TextInput>
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
    fontSize: 15,
    opacity: 0.6,
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
