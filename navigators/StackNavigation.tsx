import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./BottomTabs";
import DetailPage from "../pages/productDetail";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"HomeTabs"}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeTabs' component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
