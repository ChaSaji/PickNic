import * as React from "react";
import CookingScreen from "../../screens/CookingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CookingDetailScreen from "../../screens/CookingDetailScreen";
import CookingAnimationScreen from "../../screens/CookingAnimationScreen";

const Stack = createStackNavigator();

const CookingScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cooking" component={CookingScreen} />
      <Stack.Screen name="CookingDetail" component={CookingDetailScreen} />
      <Stack.Screen
        name="CookingAnimation"
        component={CookingAnimationScreen}
      />
    </Stack.Navigator>
  );
};

export default CookingScreenNavigator;
