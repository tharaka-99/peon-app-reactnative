import { StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import StaffPendingTasks from "./StaffPendingTasks";
import StaffCompleteTasks from "./StaffCompleteTasks";

const Tab = createMaterialTopTabNavigator();

export default function AllBookings({ route }) {
  const { worker_data } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        // tabBarItemStyle: { width: 150 },
        tabBarStyle: {
          marginTop: 40,
          marginStart: 20,
          marginEnd: 20,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="Pending"
        component={StaffPendingTasks}
        initialParams={{ worker_data }}
        options={{
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15,
          },
        }}
      />
      <Tab.Screen
        name="Completed"
        component={StaffCompleteTasks}
        initialParams={{ worker_data }}
        options={{
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
