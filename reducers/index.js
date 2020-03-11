import axios from "axios";
import io from "socket.io-client";

export const types = {
  ADD_MESSAGE: "ADD_MESSAGE",
  FETCH_MESSAGES: "FETCH_MESSAGES",
  GET_CHATS: "GET_CHATS",
  SET_CURRENT_CHAT: "SET_CURRENT_CHAT",
  SET_SOCKET: "SET_SOCKET",
  SET_TOKEN: "SET_TOKEN"
};

export const actionCreators = {
  fetchMessages: id => async (dispatch, getState) => {
    try {
      const { token } = getState();
      const headers = { Authorization: `Bearer ${token}` };
      const endpoint = `http://localhost:5000/message?chat=${id}`;
      const response = await axios({
        method: "GET",
        url: endpoint,
        headers
      });
      const messages = response.data["response"];
      dispatch({ type: types.SET_CURRENT_CHAT, payload: id });
      dispatch({ type: types.FETCH_MESSAGES, payload: messages });
    } catch (err) {
      console.error(err.message);
    }
  },

  getChats: () => (dispatch, getState) => {
    const { token } = getState();
    const options = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    };
    const socket = io("http://localhost:5000", options);
    socket.emit("join_chats");
    socket.on("join_chats", chats => {
      dispatch({ type: types.GET_CHATS, payload: chats });
    });
    socket.on("message", message => {
      const { currentChat } = getState();
      if (message.chat_id == currentChat) {
        dispatch({ type: types.ADD_MESSAGE, payload: message });
      }
    });
    socket.on("error", err => {
      console.error(err);
    });
    dispatch({ type: types.SET_SOCKET, payload: socket });
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
  token: ""
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
    case types.GET_CHATS: {
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
