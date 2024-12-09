import { View, Text } from "react-native";
import React from "react";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Landing from "../../pages/Landing";
import Profile from "../../pages/Profile";
import AvatarSelection from "../../pages/AvatarSelection";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'fade',
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
        },
      }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AvatarSelection" component={AvatarSelection} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
