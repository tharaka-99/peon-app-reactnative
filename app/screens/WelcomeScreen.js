import { Text, View, Image, Button } from "react-native";
import React, { Component } from "react";
import { ImageBackground, StyleSheet } from "react-native";

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View
        style={styles.background}
        // source={require('../assets/Add a heading (3).jpg')}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/unnamed-removebg-preview.png")}
          />
          <Text>PEON APP</Text>
        </View>
        <View style={styles.loginButton}></View>
        <View style={styles.singinButton}>
          <Text style={{ fontSize: 25 }}>Submit</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#EFFFFD",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    height: 200,
    width: 200,
    borderColor: "black",
    borderWidth: 1,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  loginButton: {
    width: "70%",
    height: "7%",
    marginBottom: 10,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#85F4FF",
  },
  singinButton: {
    width: "70%",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#F7F7F7",
  },
});
