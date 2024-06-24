import * as React from "react";
import BagScreen from "../../screens/BagScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const BagScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bag" component={BagScreen} />
    </Stack.Navigator>
  );
};

export default BagScreenNavigator;
