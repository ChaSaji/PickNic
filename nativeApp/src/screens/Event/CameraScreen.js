import { Button, Text, View } from "react-native";

const CameraScreen = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("Submit");
  };
  return (
    <View>
      <Text>CameraScreen</Text>
      <Button title={"遷移"} onPress={handleNavigation}></Button>
    </View>
  );
};

export default CameraScreen;
