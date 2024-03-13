import HomeScreen from "../../screens/HomeScreen";
import CameraScreen from "../../screens/CameraScreen";
import PictureScreen from "../../screens/PictureScreen";
import PictureViewScreen from "../../screens/PictureViewScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { CameraProvider } from "../../context/CameraContext";
import GetMaterialScreen from "../../screens/GetMaterialScreen";
import { LocationProvider } from "../../context/LocationContext";
import SubmitToAPIScreen from "../../screens/SubmitToAPIScreen";

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <CameraProvider>
      <LocationProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Picture" component={PictureScreen} />
          <Stack.Screen name="SubmitToAPI" component={SubmitToAPIScreen} />
          <Stack.Screen
            name="GetMaterial"
            component={GetMaterialScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="PictureView" component={PictureViewScreen} />
        </Stack.Navigator>
      </LocationProvider>
    </CameraProvider>
  );
};

export default HomeScreenNavigator;
