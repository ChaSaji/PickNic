import * as React from "react";
import CookingScreen from "../../screens/CookingScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const CookingScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cooking" component={CookingScreen} />
    </Stack.Navigator>
  );
};

export default CookingScreenNavigator;
