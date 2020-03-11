import React from "react";
import {
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

let ChatList = ({ chats, navigation }) => {
  const goToChat = id => {
    navigation.navigate("Chat", { id });
  };

  return (
    <View>
      {chats.map(chat => (
        <TouchableOpacity
          style={styles.chat}
          key={chat.id}
          onPress={() => goToChat(chat.id)}
        >
          <View style={styles.chatRow}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.chatDate}>
              {chat.lastMessage
                ? chat.lastMessage.date_created.slice(0, 10)
                : chat.date_created.slice(0, 10)}
            </Text>
          </View>
          <View style={styles.chatRow}>
            <Text style={styles.lastMessage}>
              {chat.lastMessage ? chat.lastMessage.content : null}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    padding: "20px",
    borderBottomWidth: "1px",
    borderBottomColor: "#D8D8D8"
  },
  chatRow: { flexDirection: "row" },
  chatName: { flex: 3 },
  chatDate: { flex: 1, textAlign: "right", color: "#767676" },
  lastMessage: { color: "#767676" }
});

const mapStateToProps = state => ({
  chats: state.chats
});

ChatList = connect(mapStateToProps)(ChatList);

export default ChatList;
