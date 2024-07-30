import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopScreen from "../../screens/Event/TopScreen";
import DetailScreen from "../../screens/Event/DetailScreen";
import MapScreen from "../../screens/Event/MapScreen";
import { LocationProvider } from "../../context/LocationContext";
import { CameraProvider } from "../../context/CameraContext";
import CameraScreen from "../../screens/Event/CameraScreen";
import LoadingScreen from "../../screens/Event/LoadingScreen";
import SubmitScreen from "../../screens/Event/SubmitScreen";
import ResultScreen from "../../screens/Event/ResultScreen";
import { WebInitContext } from "../../context/WebInitContext";
import WebInitRemindScreen from "../../screens/Event/WebInitRemindScreen";
import RankingScreen from "../../screens/Event/RankingScreen";

const Stack = createStackNavigator();

const EventScreenNavigator = () => {
  const { isWebInit } = useContext(WebInitContext);

  return isWebInit ? (
    <CameraProvider>
      <LocationProvider>
        <Stack.Navigator>
          <Stack.Screen name="Event" component={TopScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Ranking" component={RankingScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Submit" component={SubmitScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </LocationProvider>
    </CameraProvider>
  ) : (
    <WebInitRemindScreen />
  );
};

export default EventScreenNavigator;
