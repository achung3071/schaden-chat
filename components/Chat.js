import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { actionCreators } from "../reducers";

let Chat = ({ id = 1, messages, fetchMessages, token, socket }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchMessages(id);
  }, [token]);

  return (
    <View>
      {messages
        .slice()
        .reverse()
        .map(message => (
          <View>
            <Text>{message.content}</Text>
          </View>
        ))}
      <TextInput
        style={styles.messageInput}
        placeholder="Type your message..."
        onChangeText={setContent}
        value={content}
      />
      <TouchableOpacity onPress={() => socket.send({ content, chat_id: id })}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const offset = 24;
const styles = StyleSheet.create({
  buttonText: {
    marginLeft: offset,
    fontSize: offset
  },
  messageInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1
  }
});

const mapStateToProps = state => ({
  messages: state.messages,
  token: state.token,
  socket: state.socket
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: id => dispatch(actionCreators.fetchMessages(id))
});

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default Chat;
