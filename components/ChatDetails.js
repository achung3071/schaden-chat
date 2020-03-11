import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

let ChatDetails = ({ route }) => {
  const { chat } = route.params;
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.row}>
        <Text>Chat Name: {chat.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text>View Origin Post/Review</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text>Mute Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text>Leave Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { paddingVertical: "10px" },
  row: { paddingHorizontal: "20px", paddingVertical: "15px" }
});

export default ChatDetails;
