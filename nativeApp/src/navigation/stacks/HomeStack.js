import HomeScreen from "../../screens/HomeScreen";
import CameraScreen from "../../screens/CameraScreen";
import PictureScreen from "../../screens/PictureScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { CameraProvider } from "../../context/CameraContext";
import GetMaterialScreen from "../../screens/GetMaterialScreen";
import { GetMaterialProvider } from "../../context/GetMaterialContext";

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <CameraProvider>
      <GetMaterialProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Picture" component={PictureScreen} />
          <Stack.Screen
            name="GetMaterial"
            component={GetMaterialScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </GetMaterialProvider>
    </CameraProvider>
  );
};

export default HomeScreenNavigator;
