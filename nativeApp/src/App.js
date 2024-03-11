import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { CreateAndInitTableIfNotExist} from "./lib/dataBaseHelper";

export default function App() {
  CreateAndInitTableIfNotExist();
  //ExecuteQuery("drop table IF EXISTS RecipeDatail;");
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
