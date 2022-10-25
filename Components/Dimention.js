import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { Button } from "react-native-web";

export default function Dimention() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8BBD0",
        flexDirection: "row",
        justifyContent: "center", // horizontaly centered
        alignItems: "center",
        // flexWrap: "wrap",
      }}
    >
      <View
        style={{
          backgroundColor: "gold",
          height: 100,
          width: 100,
          top: 20,
          borderColor: "black",
          borderWidth: 1,
          position: "absolute",
          // flexGrow:1,
        }}
      />

      <View
        style={{
          backgroundColor: "tomato",
          height: 100,
          width: 100,
          borderColor: "black",
          borderWidth: 1,
        }}
      />
      <View
        style={{
          backgroundColor: "dodgerblue",
          height: 100,
          width: 100,
          borderColor: "black",
          borderWidth: 1,
        }}
      />
    </View>

    // <SafeAreaView
    // style={{
    //   backgroundColor:"#fff",
    //   flexDirection: "row"

    // }}>
    //   <View
    //    style={{
    //     backgroundColor:"tomato",

    //   }}>
    //     <Text>tharaka</Text>
    //  </View>
    //  <View
    //    style={{
    //     backgroundColor:"gold",
    //   }}>
    //     <Text>tharaka</Text>
    //     {/* <Button title='Click Me'
    //         onPress={()=> alert(
    //           "My Title", "my Message",
    //           // (text) => console.log(text),
    //           // [{text: "yes", onPress: ()=> console.log("yes")},
    //           // {text: "no", onPress: ()=> console.log("no")},]
    //           )}
    //           /> */}
    //  </View>

    //  <View
    //    style={{
    //     backgroundColor:"black",
    //     width: "10%"
    //   }}>

    //  </View>

    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
