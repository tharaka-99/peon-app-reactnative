import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StaffHome from "../StaffHome";
import AllBookings from "./AllBookings";
import BookingHome from "./BookingHome";

const Tab = createBottomTabNavigator();

export default function StaffHomePage({ route }) {
  const { worker_data } = route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StaffHome}
        initialParams={{ worker_data }}
        options={{
          headerBackVisible: false,
          headerShown: false,
          tabBarLabelPosition: "beside-icon",
          tabBarIconStyle: { display: "none" },
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15,
          },
        }}
      />
      <Tab.Screen
        name="Service"
        component={AllBookings}
        initialParams={{ worker_data }}
        options={{
          headerBackVisible: false,
          headerShown: false,
          tabBarLabelPosition: "beside-icon",

          tabBarIconStyle: { display: "none" },
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
