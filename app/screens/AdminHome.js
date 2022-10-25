import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function AdminHome() {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <View style={{ marginLeft: 15, marginTop: 30 }}>
          <Text style={{ fontSize: 20, opacity: 0.5, fontWeight: "bold" }}>
            Staff Member
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate("Create Account")}
          >
            <Image
              source={require("../assets/register.png")}
              style={{ width: 50, height: 50 }}
            ></Image>
            <Text style={styles.text}>Staff Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate("Registered Staff Members")}
          >
            <Image
              source={require("../assets/List.png")}
              style={{ width: 50, height: 50 }}
            ></Image>
            <Text style={styles.text}>Staff List</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={{ marginLeft: 15, marginTop: 30 }}>
          <Text style={{ fontSize: 20, opacity: 0.5, fontWeight: "bold" }}>
            Peon
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",

            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate("Register")}
          >
            <Image
              source={require("../assets/register.png")}
              style={{ width: 50, height: 50 }}
            ></Image>
            <Text style={styles.text}>Peon Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate("Registered Peon Members")}
          >
            <Image
              source={require("../assets/List.png")}
              style={{ width: 50, height: 50 }}
            ></Image>
            <Text style={styles.text}>Peon List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TouchableOpacity: {
    backgroundColor: "#fff",
    width: "45%",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    height: 100,
    borderColor: "rgb(20, 128, 255)",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "rgb(20, 128, 255)",
  },
});
