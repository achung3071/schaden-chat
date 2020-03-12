import axios from "axios";
import io from "socket.io-client";

const toGiftedMessage = message => {
  const { id, content, date_created, user_id } = message;
  return {
    _id: id,
    text: content,
    createdAt: new Date(date_created),
    user: { _id: user_id }
  };
};

let emit, send; // for preserving original socket methods

export const types = {
  ADD_MESSAGE: "ADD_MESSAGE",
  FETCH_MESSAGES: "FETCH_MESSAGES",
  SET_CURRENT_CHAT: "SET_CURRENT_CHAT",
  SET_CHATS: "SET_CHATS",
  SET_SOCKET: "SET_SOCKET",
  SET_TOKEN: "SET_TOKEN"
};

export const actionCreators = {
  fetchMessages: id => async (dispatch, getState) => {
    try {
      const { token } = getState();
      const headers = { Authorization: `Bearer ${token}` };
      const url = `http://localhost:5000/message?chat=${id}`;
      const response = await axios({ method: "GET", url, headers });
      let messages = response.data["response"];
      messages = messages.map(toGiftedMessage);
      dispatch({ type: types.SET_CURRENT_CHAT, payload: id });
      dispatch({ type: types.FETCH_MESSAGES, payload: messages });
    } catch (err) {
      console.log(err);
    }
  },

  getChats: () => (dispatch, getState) => {
    let { socket, token } = getState();
    if (socket) {
      // update token that is being sent with every request
      socket.emit = (event, data) => emit(event, { ...data, token });
      socket.send = data => send({ ...data, token });
      socket.emit("join_chats"); // Join and set chats
    } else {
      socket = io("ws://localhost:5000", { transports: ["websocket"] });
      emit = socket.emit.bind(socket);
      send = socket.send.bind(socket);
      socket.on("join_chats", async chats => {
        for (const chat of chats) {
          // need to call getState again, else token val stays constant
          const { token } = getState();
          const headers = { Authorization: `Bearer ${token}` };
          const url = `http://localhost:5000/message?chat=${chat.id}`;
          const options = { method: "GET", url, headers };
          const response = await axios(options);
          chat.lastMessage = response.data["response"][0];
        }
        dispatch({
          type: types.SET_CHATS,
          payload: chats
        });
      });
      socket.on("message", message => {
        let { chats, currentChat } = getState();
        chats = chats.map(chat => {
          if (chat.id === message.chat_id) {
            chat.lastMessage = message;
          }
          return chat;
        });
        dispatch({ type: types.SET_CHATS, payload: chats });
        if (message.chat_id === currentChat) {
          message = toGiftedMessage(message);
          dispatch({ type: types.ADD_MESSAGE, payload: message });
        }
      });
      socket.on("error", err => console.log(err));
      dispatch({ type: types.SET_SOCKET, payload: socket });
    }
  },

  editChat: (data, id) => async (dispatch, getState) => {
    try {
      let { chats, token } = getState();
      chats = chats.slice();
      const headers = { Authorization: `Bearer ${token}` };
      const url = `http://localhost:5000/chat/${id}`;
      const options = { method: "PUT", url, data, headers };
      const response = await axios(options);
      const editedChat = response.data["response"];
      const index = chats.findIndex(chat => chat.id === id);
      editedChat.lastMessage = chats[index].lastMessage;
      chats[index] = editedChat;
      dispatch({ type: types.SET_CHATS, payload: chats });
    } catch (err) {
      console.log(err);
    }
  },

  setToken: token => (dispatch, getState) => {
    dispatch({ type: types.SET_TOKEN, payload: token });
  }
};

const initialState = {
  chats: [],
  currentChat: null,
  messages: [],
  socket: null,
  token: "dummy"
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_MESSAGE: {
      // newest message first
      return { ...state, messages: [payload, ...state.messages] };
    }
    case types.FETCH_MESSAGES: {
      return { ...state, messages: payload };
    }
    case types.SET_CHATS: {
      return { ...state, chats: payload };
    }
    case types.SET_CURRENT_CHAT: {
      return { ...state, currentChat: payload };
    }
    case types.SET_TOKEN: {
      return { ...state, token: payload };
    }
    case types.SET_SOCKET: {
      return { ...state, socket: payload };
    }
  }
  return state;
};

export default reducer;
