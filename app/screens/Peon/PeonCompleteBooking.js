import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
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

export default function PeonCompleteBooking({ route }) {
  const { worker_data } = route.params;
  const peonID = worker_data.uid;
  // const navigation = useNavigation();

  const [tasks, setTasks] = useState([]);

  const tasksCollectinRef = collection(db, "Complete_Tasks");

  useEffect(() => {
    const getTasks = async () => {
      const q = query(
        tasksCollectinRef,
        where("peon_id", "==", worker_data.uid)
      );
      const data = await getDocs(q);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, []);

  return (
    <View>
      {/* <Text>{worker_data.uid}</Text> */}
      <View
        style={{
          // marginTop: 20,
          backgroundColor: "#fff",
          height: "100%",
          // borderTopEndRadius: 20,
          // borderTopStartRadius: 20,
          elevation: 10,
          shadowColor: "black",
          paddingVertical: 10,
          paddingHorizontal: 10,
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
          {worker_data.peon_name}, Your completed tasks!
        </Text>
        <View
          style={{
            height: "95%",
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
                      <Text style={styles.cardText}>
                        Service Resiver's Name -{" "}
                      </Text>
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
                    paddingVertical: 10,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                ></View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                ></View>
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
    // marginTop: 15,
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
