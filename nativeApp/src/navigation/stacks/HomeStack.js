import * as React from "react";
import HomeScreen from "../../screens/HomeScreen";
import CameraScreen from "../../screens/CameraScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigator;
