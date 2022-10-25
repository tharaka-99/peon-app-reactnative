import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AppText(props) {
  return (
   <Text style = {styles.text}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
    text:{
        color: "tomato",
        fontSize: 30,
        fontFamily: "Roboto"
    }
})