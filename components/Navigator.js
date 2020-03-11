import React, { useEffect } from "react";
import Chat from "./Chat";
import { AsyncStorage } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { actionCreators } from "../reducers";
import { connect } from "react-redux";

const Stack = createStackNavigator();
const jwt = // Token for user id 22
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTUzNTQ2MTYsImlhdCI6MTU4MzgxODYxNiwic3ViIjoyMn0.WR1XQUlsCbp0YwzmzquxxrAWKF2Yx5FIYOt-S6stpzA";

let Navigator = ({ token, getChats, setToken }) => {
  const deviceStorage = {
    saveItem: (key, value) => {
      AsyncStorage.setItem(key, value);
    },
    loadJWT: async () => {
      const value = await AsyncStorage.getItem("id_token");
      if (value !== null) {
        setToken(value);
      }
    }
  };

  useEffect(() => {
    async function handleJWT() {
      await deviceStorage.saveItem("id_token", jwt);
      deviceStorage.loadJWT();
    }
    handleJWT();
  }, []);

  useEffect(getChats, [token]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chat">
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(actionCreators.setToken(token)),
  getChats: () => dispatch(actionCreators.getChats())
});

Navigator = connect(mapStateToProps, mapDispatchToProps)(Navigator);

export default Navigator;
