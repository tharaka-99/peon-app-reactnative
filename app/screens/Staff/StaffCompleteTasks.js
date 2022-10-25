import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function StaffCompleteTasks({ route }) {
  const { worker_data } = route.params;

  const [tasks, setTasks] = useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const tasksCollectinRef = collection(db, "Complete_Tasks");

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
    getTasks();
  }, [ignored]);

  return (
    <View>
      {/* <Text>{worker_data.uid}</Text> */}
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
          {worker_data.staff_name}, Your completed tasks!
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

const styles = StyleSheet.create({});
