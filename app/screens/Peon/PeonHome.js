import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PeonCompleteBooking from "./PeonCompleteBooking";
import PeonPendingBooking from "./PeonPendingBooking";

const Tab = createBottomTabNavigator();

export default function PeonHome({ route }) {
  const { worker_data } = route.params;
  const navigation = useNavigation();
  const auth = getAuth();
  const handleSignout = () => {
    const auth = getAuth();
    auth.signOut().then(() => navigation.navigate("Login"));
  };
  //   const route = useRoute();
  return (
    // <View>
    //   <TouchableOpacity onPress={() => handleSignout()}>
    //     <Text style={{ fontSize: 20 }}>Peon Home Page</Text>
    //   </TouchableOpacity>
    // </View>

    <Tab.Navigator>
      <Tab.Screen
        name="Pending Tasks "
        component={PeonPendingBooking}
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
        name="Complete Tasks"
        component={PeonCompleteBooking}
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
