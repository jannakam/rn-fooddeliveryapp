import { View, Text, StatusBar } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../pages/Home";
import DiscoverPage from "../../pages/DiscoverPage";
import Profile from "../../pages/Profile";
import MenuItems from "../../pages/MenuItems";
import Cart from "../../pages/Cart";
import Detail from "../../pages/Detail";
import BottomNavigation from "../BottomNav/BottomNavigation";
import Header from "../../components/Header";
import COLORS from "../../constants/colors";
import OrderHistory from "../../pages/OrderHistory";
import OrderConfirmation from "../../pages/OrderConfirmation";
const Stack = createNativeStackNavigator();

const commonScreenOptions = {
  header: () => (
    <>
      <StatusBar backgroundColor={COLORS.PRIMARY} barStyle="light-content" />
      <Header />
    </>
  ),
};

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen 
  name="MenuItem" 
  component={MenuItems}
  options={{
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress
      }
    })
  }}
/>
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
    </Stack.Navigator>
  );
};

export const DiscoverStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="DiscoverScreen" component={DiscoverPage} />
      <Stack.Screen 
  name="MenuItem" 
  component={MenuItems}
  options={{
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress
      }
    })
  }}
/>
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => {
  return <BottomNavigation />;
};

export default HomeNavigation;
