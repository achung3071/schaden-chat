import React, { useEffect, useLayoutEffect } from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Button, Icon } from "react-native-elements";
import { HeaderBackButton } from "react-navigation-stack";
import { connect } from "react-redux";
import { actionCreators } from "../reducers";

let Chat = ({
  chats,
  messages,
  fetchMessages,
  token,
  socket,
  route,
  navigation
}) => {
  const user = { _id: 22 };
  const { id } = route.params;
  const chat = chats.find(chat => chat.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chat.name,
      headerLeft: () => (
        // go back to ChatList (needed b/c of navigation.replace from ChatDetails)
        <HeaderBackButton onPress={navigation.popToTop} />
      ),
      headerRight: () => (
        <Button
          icon={<Icon name="info" />}
          type="clear"
          onPress={() => navigation.navigate("ChatDetails", { id })}
        />
      )
    });
  }, []);

  useEffect(() => {
    fetchMessages(id);
  }, [token]);

  const send = messages => {
    messages.forEach(message => {
      const data = { content: message.text, chat_id: id };
      socket.send(data);
    });
  };

  const wrapperStyle = { right: { backgroundColor: "#03A34A" } };
  const renderBubble = props => (
    <Bubble {...props} wrapperStyle={wrapperStyle} />
  );

  const chatInterface = (
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
        {chatInterface}
      </KeyboardAvoidingView>
    );
  }
  return <SafeAreaView style={{ flex: 1 }}>{chatInterface}</SafeAreaView>;
};

const mapStateToProps = state => ({
  chats: state.chats,
  messages: state.messages,
  token: state.token,
  socket: state.socket
});
const mapDispatchToProps = dispatch => ({
  fetchMessages: id => dispatch(actionCreators.fetchMessages(id))
});
Chat = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default Chat;
