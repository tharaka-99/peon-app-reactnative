import { StyleSheet, View, Platform, StatusBar } from "react-native";
import Home from "./app/screens/Home";
import TestingOtp from "./Components/TestingOtp";

export default function App() {
  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <Home />
    </View>
  );
}