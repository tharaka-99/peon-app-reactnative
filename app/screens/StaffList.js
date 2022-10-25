import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ToastAndroid,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { LogBox } from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

LogBox.ignoreLogs(["Setting a timer"]);

export default function StaffList() {
  const [staff, setStaff] = useState([]);
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const initialState = {
    uid: "",
    email: "",
    staff_deparment: "",
    staff_name: "",
    staff_service_id: "",
    username: "",
  };
  const [updateuser, setUpdateuser] = useState(initialState);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  //create collection reffrence
  const staffCollectinRef = collection(db, "staff");

  useEffect(() => {
    const getStaff = async () => {
      const data = await getDocs(staffCollectinRef);
      setStaff(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //   console.log(data);
      forceUpdate();
    };
    getStaff();
  }, [ignored]);

  const deleteUser = async (id) => {
    try {
      const UserDoc = doc(db, "staff", id);
      await deleteDoc(UserDoc);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    ToastAndroid.show("successfully Deleted!", ToastAndroid.SHORT);
    navigation.navigate("Registered Staff Members");
    // location.reload();
    forceUpdate();
  };

  const updatemember = async (id) => {
    try {
      const docRef = await getDoc(doc(db, "staff", id));
      console.log("Document data:", docRef.data());
      setUpdateuser({ ...docRef.data(), id: docRef.id });
      forceUpdate();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setModalOpen(true);
    // location.reload();
  };

  const setupdate = async () => {
    await updateDoc(doc(db, "staff", updateuser.uid), {
      email: updateuser.email,
      staff_deparment: updateuser.staff_deparment,
      staff_name: updateuser.staff_name,
      staff_service_id: updateuser.staff_service_id,
      username: updateuser.username,
    });
    ToastAndroid.show("successfully updated!", ToastAndroid.SHORT);
    setUpdateuser(initialState);
    setModalOpen(false);
    forceUpdate();
  };

  const handleChangeText = (name, value) => {
    setUpdateuser({ ...updateuser, [name]: value });
  };

  return (
    <View>
      <Modal visible={modalOpen} transparent={true} animationType="fade">
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "#000000AA",
            flex: 1,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 5,
            }}
          >
            <View
              style={{
                // width: 25,
                // height: 25,
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 25,
                  height: 25,
                }}
                onPress={() => setModalOpen(false)}
              >
                <Image
                  source={require("../assets/cancel.png")}
                  style={{ width: 25, height: 25 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: "bold" }}>Email:</Text>
            <TextInput
              placeholder="enter email"
              keyboardType="email-address"
              value={updateuser.email}
              onChangeText={(val) => handleChangeText("email", val)}
              style={{
                borderBottomWidth: 0.2,
                borderColor: "black",
                // padding: 5,
                marginVertical: 5,
              }}
            ></TextInput>
            <Text style={{ fontWeight: "bold" }}>Deparment Name:</Text>
            <TextInput
              placeholder="staff_deparment"
              value={updateuser.staff_deparment}
              onChangeText={(val) => handleChangeText("staff_deparment", val)}
              style={{
                borderBottomWidth: 0.2,
                borderColor: "black",
                // padding: 5,
                marginVertical: 5,
              }}
            ></TextInput>
            <Text style={{ fontWeight: "bold" }}>Employee Name:</Text>
            <TextInput
              placeholder="staff_name"
              value={updateuser.staff_name}
              onChangeText={(val) => handleChangeText("staff_name", val)}
              style={{
                borderBottomWidth: 0.2,
                borderColor: "black",
                // padding: 5,
                marginVertical: 5,
              }}
            ></TextInput>

            <Text style={{ fontWeight: "bold" }}>Service Id:</Text>
            <TextInput
              placeholder="staff_service_id"
              value={updateuser.staff_service_id}
              onChangeText={(val) => handleChangeText("staff_service_id", val)}
              style={{
                borderBottomWidth: 0.2,
                borderColor: "black",
                // padding: 5,
                marginVertical: 5,
              }}
            ></TextInput>
            <Text style={{ fontWeight: "bold" }}>username:</Text>
            <TextInput
              placeholder="username"
              value={updateuser.username}
              onChangeText={(val) => handleChangeText("username", val)}
              style={{
                borderBottomWidth: 0.2,
                borderColor: "black",
                // padding: 5,
                marginVertical: 5,
              }}
            ></TextInput>

            <Button
              type="submit"
              title="update"
              onPress={() => setupdate()}
            ></Button>
          </View>
        </View>
      </Modal>
      <View
        style={{
          margin: 5,
        }}
      >
        <FlatList
          data={staff}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                padding: 10,
                backgroundColor: "#fff",
                margin: 5,
                marginBottom: 15,
                borderRadius: 10,
                elevation: 10,
                shadowColor: "black",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Avatar
                  rounded
                  source={require("../assets/avatar6.png")}
                  size="large"
                />
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={styles.cardText}>Name: {item.staff_name}</Text>
                  <Text style={styles.cardText}>
                    Service no: {item.staff_service_id}
                  </Text>
                  <Text style={styles.cardText}>
                    Department : {item.staff_deparment}
                  </Text>
                  <Text style={styles.cardText}>Email: {item.email}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  // backgroundColor: "#F8BBD0",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  // justifyContent: "center", // horizontaly centered
                  // alignItems: "center",
                  // flexWrap: "wrap",
                }}
              >
                {/* <TouchableHighlight
                  style={styles.button}
                  activeOpacity={2}
                  //   onPress={() => console.log("pressed")}
                  underlayColor="#0084fffa"
                >
                  <Text
                    style={{
                      fontSize: 20,

                      color: "#c8e2ff",
                    }}
                  >
                    Book
                  </Text>
                </TouchableHighlight> */}
                <View
                  style={{
                    flex: 1,

                    flexDirection: "row",
                    justifyContent: "flex-end",
                    // justifyContent: "center", // horizontaly centered
                    // alignItems: "center",
                    // flexWrap: "wrap",
                  }}
                >
                  <TouchableHighlight
                    style={styles.updatebutton}
                    activeOpacity={2}
                    onPress={() => {
                      updatemember(item.id);
                    }}
                    underlayColor="#0084fffa"
                  >
                    <Text
                      style={{
                        color: "#c8e2ff",
                      }}
                    >
                      Update
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.deleteButton}
                    activeOpacity={2}
                    //   onPress={() => console.log("pressed")}
                    underlayColor="tomato"
                    onPress={() => {
                      deleteUser(item.id);
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      {/* {staff.map((user, id) => {
        return (
          <View key={id}>
            <Text>Name: {user.name}</Text>
          </View>
        );
      })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    flex: 0.4,
    backgroundColor: "#0056A2",
    marginHorizontal: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  cardText: {
    fontSize: 15,
  },
  updatebutton: {
    marginTop: 15,
    flex: 0.2,
    backgroundColor: "#0056A2",
    marginHorizontal: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  deleteButton: {
    marginTop: 15,
    flex: 0.2,
    backgroundColor: "tomato",
    marginHorizontal: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
