import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { DbUpdateProvider } from "./context/DbUpdateContext";
import {
  CreateAndInitTableIfNotExist,
  get_isAccessed,
} from "./lib/dataBaseHelper";
import WebInitScreen from "./screens/WebInitScreen";
import { WebInitContext, WebInitProvider } from "./context/WebInitContext";

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isWebInit, setIsWebInit, isSkipped } = useContext(WebInitContext);

  useEffect(() => {
    (async () => {
      try {
        await CreateAndInitTableIfNotExist();
        if (await get_isAccessed()) setIsWebInit(true);
      } catch (error) {
        console.error("エラー:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return;

  return isWebInit || isSkipped ? (
    <DbUpdateProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </DbUpdateProvider>
  ) : (
    <WebInitScreen />
  );
};

export default function App() {
  return (
    <WebInitProvider>
      <AppContent />
    </WebInitProvider>
  );
}
