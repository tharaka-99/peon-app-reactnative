import { StyleSheet, Text, View, Platform } from 'react-native'

export default function AppText(props) {
  return (

      <Text style= {styles.text}>{props.children}</Text>
    
  )
}
// Platform.select({
//     ios: {
//         fontSize:20,
//         fontFamily: "Avenir"
//     },
//     android:{
//         fontSize:18,
//         fontFamily: "Roboto"

//     }
// })

const styles = StyleSheet.create({
    // text: {
    //     color: "blue",
    //     ...Platform.select({
    //         ios: {
    //             fontSize:20,
    //             fontFamily: "Avenir"
    //         },
    //         android:{
    //             fontSize:30,
    //             fontFamily: "Roboto"
        
    //         }
    //     })
    // }
})