import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./screens/CameraScreen";
import CookingScreen from "./screens/CookingScreen";
import BagScreen from "./screens/BagScreen";
import BadgeScreen from "./screens/BadgeScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Cooking" component={CookingScreen} />
      <Tab.Screen name="Bag" component={BagScreen} />
      <Tab.Screen name="Badge" component={BadgeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
