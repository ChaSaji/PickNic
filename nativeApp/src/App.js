import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { DbUpdateProvider } from "./context/DbUpdateContext";
import { CreateAndInitTableIfNotExist } from "./lib/dataBaseHelper";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        await CreateAndInitTableIfNotExist();
        setIsLoading(false);
      } catch (error) {
        console.error("エラー:", error);
      }
    })();
  }, []);

  if (isLoading) return;
  return (
    <DbUpdateProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </DbUpdateProvider>
  );
}
