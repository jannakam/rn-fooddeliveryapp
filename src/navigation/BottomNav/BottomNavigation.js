import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons";
import { HomeStack, DiscoverStack, ProfileStack } from '../HomeNav/HomeNavigation';
import COLORS from '../../constants/colors';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.PRIMARY,
          borderTopWidth: 1,
          borderColor: '#ddd',
          paddingVertical: 10,
          height: 90,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: COLORS.MUTED,
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color={color} style={{paddingVertical: 50}} />
          ),
          tabBarLabel: '',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="DiscoverTab" 
        component={DiscoverStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.exploreIconContainer}>
              <Feather name="search" size={32} color="white" />
            </View>
          ),
          tabBarLabel: '',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color={color} style={{paddingVertical: 50}} />
          ),
          tabBarLabel: '',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({
  exploreIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.ACCENT,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
    elevation: 5,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})