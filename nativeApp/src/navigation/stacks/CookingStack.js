import * as React from "react";
import CookingScreen from "../../screens/CookingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CookingDetailScreen from "../../screens/CookingDetailScreen";
import CookingAnimationScreen from "../../screens/CookingAnimationScreen";
import CookingCompleteScreen from "../../screens/CookingCompleteScreen";

const Stack = createStackNavigator();

const CookingScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cooking" component={CookingScreen} />
      <Stack.Screen name="CookingDetail" component={CookingDetailScreen} />
      <Stack.Screen
        name="CookingAnimation"
        component={CookingAnimationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CookingComplete"
        component={CookingCompleteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CookingScreenNavigator;
