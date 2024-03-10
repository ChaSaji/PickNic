import HomeScreen from "../../screens/HomeScreen";
import CameraScreen from "../../screens/CameraScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { CameraProvider } from "../../context/CameraContext";

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <CameraProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </CameraProvider>
  );
};

export default HomeScreenNavigator;
