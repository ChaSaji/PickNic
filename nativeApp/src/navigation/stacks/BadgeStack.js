import * as React from "react";
import BadgeScreen from "../../screens/BadgeScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const BadgeScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Badge" component={BadgeScreen} />
    </Stack.Navigator>
  );
};

export default BadgeScreenNavigator;
