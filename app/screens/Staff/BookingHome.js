import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AllBookings from "./AllBookings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function BookingHome({ route }) {
  const { worker_data } = route.params;
  return (
    <View>
      <Text>{worker_data.staff_phone}</Text>

      <Stack.Navigator>
        <Stack.Screen
          name="all"
          component={AllBookings}
          initialParams={{ worker_data }}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});
