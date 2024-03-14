import * as React from "react";
import BadgeScreen from "../../screens/BadgeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import BadgeDetailScreen from "../../screens/BadgeDetailScreen";

const Stack = createStackNavigator();

const BadgeScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Badge" component={BadgeScreen} />
      <Stack.Screen name="BadgeDetail" component={BadgeDetailScreen} />
    </Stack.Navigator>
  );
};

export default BadgeScreenNavigator;
