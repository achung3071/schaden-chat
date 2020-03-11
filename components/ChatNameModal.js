import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { connect } from "react-redux";
import { actionCreators } from "../reducers";

let ChatNameModal = ({ chats, editChat, route, navigation }) => {
  const [name, setName] = useState("");
  const { id } = route.params;
  const chat = chats.find(chat => chat.id === id);
  let status;
  if (chat.status === 1) {
    status = "Initiated";
  } else if (chat.status === 2) {
    status = "Active";
  } else if (chat.status === 3) {
    status = "Extended";
  }
  const onSubmit = () => {
    editChat({ name, status }, id);
    navigation.goBack();
  };

  return (
    <View style={styles.modal}>
      <Text style={styles.text}>Enter new chat name:</Text>
      <View style={styles.container}>
        <Input
          containerStyle={styles.inputContainer}
          placeholder={chat.name}
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button onPress={onSubmit} title="Confirm" />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, marginBottom: 15 },
  container: { flexDirection: "row", marginBottom: 20 },
  inputContainer: { flex: 1 }
});

const mapStateToProps = state => ({ chats: state.chats });
const mapDispatchToProps = dispatch => ({
  editChat: (data, id) => dispatch(actionCreators.editChat(data, id))
});
ChatNameModal = connect(mapStateToProps, mapDispatchToProps)(ChatNameModal);

export default ChatNameModal;
