import React, { useEffect } from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { connect } from "react-redux";
import { actionCreators } from "../reducers";

let Chat = ({ messages, fetchMessages, token, socket, route }) => {
  const user = { _id: 22 };
  const { id } = route.params;
  const wrapperStyle = { right: { backgroundColor: "#03A34A" } };

  const renderBubble = props => (
    <Bubble {...props} wrapperStyle={wrapperStyle} />
  );

  const send = messages => {
    messages.forEach(message => {
      const data = { content: message.text, chat_id: id };
      socket.send(data);
    });
  };

  useEffect(() => {
    fetchMessages(id);
  }, [token]);

  const chat = (
    <GiftedChat
      messages={messages}
      onSend={send}
      user={user}
      renderBubble={renderBubble}
    />
  );
  if (Platform.OS === "android") {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={30}
        enabled
      >
        {chat}
      </KeyboardAvoidingView>
    );
  }
  return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
};

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
