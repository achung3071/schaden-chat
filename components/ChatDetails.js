import React from "react";
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  Switch,
  StyleSheet
} from "react-native";
import { actionCreators } from "../reducers";
import { connect } from "react-redux";

let ChatDetails = ({ chats, route, navigation, editChat }) => {
  const { id } = route.params;
  const chat = chats.find(chat => chat.id === id);
  const openModal = () => navigation.navigate("ChatNameModal", { id });

  const onPressLeave = () => {
    Alert.alert(
      "Leave chat?",
      "You will no longer be able to access this chat and its messages.",
      [
        {
          text: "Leave",
          onPress: () => {
            editChat({ name: chat.name, status: "Left" });
            navigation.popToTop();
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.row} onPress={openModal}>
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
      <TouchableOpacity style={styles.row} onPress={onPressLeave}>
        <Text>Leave Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { paddingVertical: 10 },
  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  action: { flex: 3 },
  toggle: { flex: 1, alignItems: "flex-end" }
});

const mapStateToProps = state => ({ chats: state.chats });
const mapDispatchToProps = dispatch => ({
  editChat: data => dispatch(actionCreators.editChat(data))
});
ChatDetails = connect(mapStateToProps, mapDispatchToProps)(ChatDetails);

export default ChatDetails;
