import React, { useLayoutEffect } from "react";
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  Switch,
  StyleSheet
} from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import { connect } from "react-redux";

let ChatDetails = ({ chats, route, navigation, editChat }) => {
  const { id } = route.params;
  const chat = chats.find(chat => chat.id === id);
  const openModal = () => navigation.navigate("ChatNameModal", { id });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        /* need to replace because goBack navigates to prev mounted component, which
        may have a different title (if name was changed). navigation.setOptions
        cannot re-render the headerTitle on an already mounted component. */
        <HeaderBackButton onPress={() => navigation.replace("Chat", { id })} />
      )
    });
  }, []);

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
  screen: { paddingVertical: "10px" },
  row: {
    flexDirection: "row",
    paddingHorizontal: "20px",
    paddingVertical: "15px"
  },
  action: { flex: 3 },
  toggle: { flex: 1, alignItems: "flex-end" }
});

const mapStateToProps = state => ({ chats: state.chats });
const mapDispatchToProps = dispatch => ({
  editChat: (data, id) => dispatch(actionCreators.editChat(data, id))
});
ChatDetails = connect(mapStateToProps, mapDispatchToProps)(ChatDetails);

export default ChatDetails;
