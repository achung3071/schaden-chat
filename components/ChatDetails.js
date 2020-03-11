import React from "react";
import { View, TouchableOpacity, Text, Switch, StyleSheet } from "react-native";

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
        <Text style={styles.action}>Mute Messages</Text>
        <View style={styles.toggle}>
          <Switch />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text>Leave Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { paddingVertical: "10px" },
  row: {
    flexDirection: "row",
    paddingHorizontal: "20px",
    paddingVertical: "15px"
  },
  action: { flex: 3 },
  toggle: { flex: 1, alignItems: "flex-end" }
});

export default ChatDetails;
