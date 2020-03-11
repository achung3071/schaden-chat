import React from "react";
import ChatList from "./ChatList";
import Chat from "./Chat";
import ChatDetails from "./ChatDetails";
import { createStackNavigator } from "@react-navigation/stack";

const ChatStack = createStackNavigator();

const ChatScreen = () => {
  const screenOpts = { headerTitleAlign: "center" };
  const chatListOpts = { title: "Messages" };
  const chatDetailsOpts = { title: "Details" };

  return (
    <ChatStack.Navigator initialRouteName="ChatList" screenOptions={screenOpts}>
      <ChatStack.Screen
        name="ChatList"
        component={ChatList}
        options={chatListOpts}
      />
      <ChatStack.Screen name="Chat" component={Chat} />
      <ChatStack.Screen
        name="ChatDetails"
        component={ChatDetails}
        options={chatDetailsOpts}
      />
    </ChatStack.Navigator>
  );
};

export default ChatScreen;
