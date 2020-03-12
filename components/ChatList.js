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
  const goToChat = chat => {
    navigation.navigate("Chat", { id: chat.id });
  };
  const incomingRequest = (chat, userId) =>
    chat.status === 1 && chat.initiator !== userId;
  const initiatedChats = chats.filter(chat => incomingRequest(chat, 22));
  const activeChats = chats.filter(chat => !incomingRequest(chat, 22));

  return (
    <View>
      <TouchableOpacity style={styles.chat}>
        <Text>{initiatedChats.length} Requests</Text>
      </TouchableOpacity>
      {activeChats.map(chat => (
        <TouchableOpacity
          style={styles.chat}
          key={chat.id}
          onPress={() => goToChat(chat)}
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
    padding: 20,
    borderBottomWidth: 1,
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
