import {
  StyleSheet,
  View,
  Button,
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PeonLogin from "./PeonLogin";
import PeonRegister from "./PeonRegister";
import StaffList from "./StaffList";
import AdminHome from "./AdminHome";
import PeonList from "./PeonList";
import StaffHome from "./StaffHome";
import CreateAcount from "./Staff/CreateAcount";
import PeonHome from "./Peon/PeonHome";
import StaffHomePage from "./Staff/StaffHomePage";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

const Stack = createNativeStackNavigator();

function LogoTitle() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  return (
    <View>
      <Menu
        style={{ width: 200 }}
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu}>
            <Image
              style={{ width: 20, height: 22 }}
              source={require("../assets/menu.png")}
            />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem
          onPress={() => {
            const auth = getAuth();
            auth.signOut().then(() => navigation.navigate("Login"));
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </View>
  );
}

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={PeonLogin} />
          <Stack.Screen name="Create Account" component={CreateAcount} />
          <Stack.Screen name="Register" component={PeonRegister} />
          <Stack.Screen
            name="Admin Home"
            component={AdminHome}
            options={{
              headerBackVisible: false,
              headerRight: () => <LogoTitle />,
            }}
          />
          <Stack.Screen
            name="Peon Home"
            component={PeonHome}
            options={{
              headerBackVisible: false,
              headerRight: () => <LogoTitle />,
            }}
          />
          <Stack.Screen name="Registered Staff Members" component={StaffList} />
          <Stack.Screen name="Registered Peon Members" component={PeonList} />
          <Stack.Screen
            name="Staff Home"
            component={StaffHomePage}
            options={{
              headerBackVisible: false,
              headerRight: () => <LogoTitle />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({});
