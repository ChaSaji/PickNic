import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopScreen from "../../screens/Event/TopScreen";
import DetailScreen from "../../screens/Event/DetailScreen";

const Stack = createStackNavigator();

const EventScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Event" component={TopScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default EventScreenNavigator;
