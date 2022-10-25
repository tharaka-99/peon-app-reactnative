import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  DevSettings,
  Alert,
} from "react-native";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  getDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Badge } from "react-native-elements";

export default function StaffPendingTasks({ route }) {
  const { worker_data } = route.params;
  const [tasks, setTasks] = useState([]);
  const [completeTask, setCompleteTask] = useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const tasksCollectinRef = collection(db, "temp_booking");
  const tasksCompleteRef = collection(db, "Complete_Tasks");

  useEffect(() => {
    const getTasks = async () => {
      const q = query(
        tasksCollectinRef,
        where("Staff_id", "==", worker_data.uid)
      );
      const data = await getDocs(q);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      forceUpdate();
    };

    // const getPeonDetails = async () => {
    //   const id = tasks.map((pid) => pid.peon_id);
    //   const docRef = await getDoc(doc(db, "peon",));
    //   setPeonDetails({ ...docRef.data(), id: docRef.id });
    // };
    getTasks();
  }, [ignored]);

  const getTasksById = async (id) => {
    try {
      const docRef = await getDoc(doc(db, "temp_booking", id));
      console.log("Document data:", docRef.data());
      setCompleteTask({ ...docRef.data(), id: docRef.id });

      await addDoc(tasksCompleteRef, {
        Staff_id: completeTask.Staff_id,
        Staff_name: completeTask.Staff_name,
        Peon_name: completeTask.Peon_name,
        Task_Location: completeTask.Task_Location,
        Tasks: completeTask.Tasks,
        peon_id: completeTask.peon_id,
      });

      await deleteDoc(doc(db, "temp_booking", id));
      ToastAndroid.show(
        "successfully added and it Dlelted from this page!",
        ToastAndroid.SHORT
      );
      forceUpdate();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const createTwoButtonAlert = (id) =>
    Alert.alert("Delete?", "Do you want to cancle Task", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteUser(id) },
    ]);

  const deleteUser = async (id) => {
    try {
      const UserDoc = doc(db, "temp_booking", id);
      await deleteDoc(UserDoc);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    ToastAndroid.show("successfully Deleted!", ToastAndroid.SHORT);
    // location.reload();
    forceUpdate();
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: "95%",
        marginHorizontal: 20,

        elevation: 10,
        shadowColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 17,
          marginBottom: 10,
        }}
      >
        {worker_data.staff_name}, your pending services.
      </Text>
      <View
        style={{
          height: "85%",
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
                    <Text style={styles.cardText}>Peon Name - </Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      {item.Peon_name}
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
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 17,
                        maxWidth: 180,
                      }}
                    >
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
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 17,
                        maxWidth: 200,
                      }}
                    >
                      {item.Tasks}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingVertical: 5,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Badge
                  value={item.State === 1 ? "Not Complete" : "Complete"}
                  status={item.State === 1 ? "error" : "success"}
                  textStyle={{ fontSize: 12 }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {item.State === 1 ? null : (
                  <TouchableOpacity
                    style={styles.updatebutton}
                    onPress={() => {
                      getTasksById(item.id);
                    }}
                    underlayColor="#0084fffa"
                  >
                    <Text
                      style={{
                        color: "#c8e2ff",
                        fontWeight: "900",
                        fontSize: 15,
                      }}
                    >
                      Completed Task
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: "#EF5350",
                    marginHorizontal: 5,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    createTwoButtonAlert(item.id);
                  }}
                  underlayColor="#0084fffa"
                >
                  <Text
                    style={{
                      color: "#c8e2ff",
                      fontWeight: "900",
                      fontSize: 15,
                    }}
                  >
                    Cancle
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
    // marginTop: 15,
    paddingHorizontal: 10,
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
