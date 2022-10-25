import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
  SafeAreaView,
  ToastAndroid,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { LogBox } from "react-native";
import { Avatar } from "react-native-elements";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

LogBox.ignoreLogs(["Setting a timer"]);

export default function StaffHome({ route }) {
  const { worker_data } = route.params;
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const [peonID, setPeonID] = useState();
  const [peonName, setPeonName] = useState();
  const [peon, setPeon] = useState([]);
  const [book, setBook] = useState([]);

  //create collection reffrence
  const peonCollectinRef = collection(db, "peon");

  useEffect(() => {
    const getPeon = async () => {
      const data = await getDocs(peonCollectinRef);
      setPeon(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPeon();
  }, []);

  const getPeonId = (id, name) => {
    setPeonID(id);
    setPeonName(name);
    setModalOpen(true);
  };

  const handleChangeText = (name, value) => {
    setBook({ ...book, [name]: value });
  };

  const tempBookingCollectinRef = collection(db, "temp_booking");

  const bookPeon = async () => {
    try {
      await addDoc(tempBookingCollectinRef, {
        Staff_id: worker_data.uid,
        Staff_name: worker_data.staff_name,
        Peon_name: peonName,
        peon_id: peonID,
        Task_Location: book.Task_Location,
        Tasks: book.Tasks,
        State: 1,
      });
      if (addDoc) {
        ToastAndroid.show("successfully booked!", ToastAndroid.SHORT);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setModalOpen(false);
  };

  return (
    <View style={{}}>
      <>
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
              {/* <Text style={styles.cardText}>STAFF id: {worker_data.name}</Text> */}
              {/* <Text style={styles.cardText}>peon id: {peonID}</Text> */}

              <Text style={{ fontWeight: "bold" }}>Enter Location:</Text>
              <TextInput
                placeholder="Enter Task Collecting Location"
                // value={updateuser.email}
                onChangeText={(val) => handleChangeText("Task_Location", val)}
                style={{
                  borderBottomWidth: 0.2,
                  borderColor: "black",
                  marginVertical: 5,
                }}
              ></TextInput>
              <Text style={{ fontWeight: "bold" }}>Enter Task:</Text>
              <TextInput
                placeholder="Enter Task"
                //value={updateuser.email}
                onChangeText={(val) => handleChangeText("Tasks", val)}
                style={{
                  borderBottomWidth: 0.2,
                  borderColor: "black",
                  marginVertical: 5,
                  marginBottom: 20,
                }}
              ></TextInput>
              <Button
                type="submit"
                title="Book"
                onPress={() => bookPeon()}
              ></Button>
            </View>
          </View>
        </Modal>
      </>
      {/* <View
        style={{
          backgroundColor: "#fff",
          // height: "20%",
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          elevation: 10,
          shadowColor: "black",
          paddingVertical: 30,
          paddingHorizontal: 10,
          // margin: 2,
        }}
      >
        <Text>{worker_data.uid}</Text>
        <Text>{worker_data.staff_service_id}</Text>
        <Text>{worker_data.staff_name}</Text>
      </View> */}
      <ImageBackground
        source={require("../assets/5559852.jpg")}
        resizeMode="cover"
        style={{
          padding: 10,
          marginTop: 15,
          marginHorizontal: 15,
          borderRadius: 10,
        }}
        imageStyle={{ borderRadius: 10 }}
      >
        <View>
          <Avatar rounded source={require("../assets/avatar6.png")} size={65} />
          <Text
            style={{
              fontSize: 27,
              fontWeight: "500",
              color: "#fff",
            }}
          >
            Welcome {worker_data.staff_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Service ID : {worker_data.staff_service_id}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Department : {worker_data.staff_deparment}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Phone number : {worker_data.staff_phone}
              </Text>
            </View>
            <View>
              {/* <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                {worker_data.staff_service_id}
              </Text> */}
            </View>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          margin: 15,
          elevation: 5,
          marginBottom: 70,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            opacity: 0.5,
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          Choose your Peon?
        </Text>

        <FlatList
          style={{
            margin: 5,
            height: "72%",
          }}
          data={peon}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 5,
                marginBottom: 15,
                // borderRadius: 10,
                // elevation: 10,
                borderBottomColor: "#757575",
                borderBottomWidth: 1,
              }}
              onPress={() => getPeonId(item.uid, item.peon_name)}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Avatar
                  rounded
                  source={require("../assets/avatar6.png")}
                  size={60}
                />
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={styles.cardText}>Name: {item.peon_name}</Text>
                  <Text style={styles.cardText}>
                    service no: {item.peon_service_id}
                  </Text>
                  <Text style={styles.cardText}>
                    department : {item.peon_deparment}
                  </Text>
                </View>
                <Image
                  source={require("../assets/right-arrow.png")}
                  style={{
                    width: 15,
                    height: 20,
                    marginVertical: 20,

                    marginLeft: 25,
                  }}
                ></Image>
              </View>
              <View>
                {/* <TouchableOpacity
                  style={styles.button}
                  // onPress={() => getPeonId(item.uid, item.peon_name)}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#c8e2ff",
                      fontWeight: "bold",
                    }}
                  >
                    Book
                  </Text>
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    width: "100%",
    backgroundColor: "#0056A2",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  cardText: {
    fontSize: 17,
    fontWeight: "bold",
    opacity: 0.7,
    color: "#000",
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
