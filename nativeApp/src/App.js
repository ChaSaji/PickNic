import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { DbUpdateProvider } from "./context/DbUpdateContext";

export default function App() {
  return (
    <DbUpdateProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </DbUpdateProvider>
  );
}
