import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-elements";

export default function PeonPendingBooking({ route }) {
  const { worker_data } = route.params;
  const peonID = worker_data.uid;
  // const navigation = useNavigation();

  const [tasks, setTasks] = useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const tasksCollectinRef = collection(db, "temp_booking");

  useEffect(() => {
    const getTasks = async () => {
      // const datadox = await getDoc(
      //   doc(db, "temp_booking", "Rwyrqr6MM82mugaLPD9J")
      // );
      // console.log("Document data:", datadox.data());
      // //setTasks({ ...docRef.data(), id: docRef.id });
      // setTasks({ ...datadox.data(), id: datadox.id });
      const q = query(
        tasksCollectinRef,
        where("peon_id", "==", worker_data.uid)
      );
      const data = await getDocs(q);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      forceUpdate();
    };
    getTasks();
  }, [ignored]);

  const createAlert = (id) =>
    Alert.alert("Delete?", "Do you want to remove this member", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "OK", onPress: () => updateState(id) },
    ]);

  const updateState = async (id) => {
    try {
      const stateUpdateRef = doc(db, "temp_booking", id);
      await updateDoc(stateUpdateRef, {
        State: 0,
      });
      ToastAndroid.show("successfully updated status!", ToastAndroid.SHORT);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    forceUpdate();
  };

  return (
    <View>
      {/* <Text style={{ fontSize: 20 }}>PeonPendingBooking</Text> */}
      <Text style={{ fontSize: 27, fontWeight: "500", paddingLeft: 10 }}>
        Welcome {worker_data.peon_name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 15,
        }}
      >
        <View>
          <Text style={styles.cardText}>Service ID - </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {worker_data.peon_service_id}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 15,
        }}
      >
        <View>
          <Text style={styles.cardText}>Deparment - </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {worker_data.peon_deparment}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          backgroundColor: "#fff",
          height: "100%",
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          elevation: 10,
          shadowColor: "black",
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            opacity: 0.5,
            marginBottom: 10,
          }}
        >
          {worker_data.peon_name}, You are not done with this tasks!
        </Text>
        <View
          style={{
            height: "70%",
          }}
        >
          <FlatList
            data={tasks}
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
                <View style={{ marginHorizontal: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <Text style={styles.cardText}>Employee Name - </Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        {item.Staff_name}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <Text style={styles.cardText}>Location - </Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        {item.Task_Location}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <Text style={styles.cardText}>Job - </Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        {item.Tasks}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Badge
                    value={item.State === 1 ? "Not Complete" : "Complete"}
                    status={item.State === 1 ? "error" : "success"}
                    textStyle={{ fontSize: 15 }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={styles.updatebutton}
                    onPress={() => {
                      updateState(item.id);
                    }}
                    underlayColor="#0084fffa"
                  >
                    <Text
                      style={{
                        color: "#c8e2ff",
                        fontWeight: "700",
                        fontSize: 15,
                      }}
                    >
                      Task Status Update
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardText: {
    fontWeight: "500",
    fontSize: 17,
    opacity: 0.5,
  },
  updatebutton: {
    paddingHorizontal: 10,
    backgroundColor: "#0056A2",
    // marginHorizontal: 5,
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
