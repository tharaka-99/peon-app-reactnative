import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";

export default function FlexList() {
  const [people, setPeople] = useState([
    { name: "tharaka", key: "1" },
    { name: "dilshan", key: "2" },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {people.map((item) => (
          <TouchableOpacity>
            <View
              key={item.key}
              style={{
                height: 100,
                backgroundColor: "gray",
                marginVertical: 5,
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
