import { Button, Text, View } from "react-native";

const LoadingScreen = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("Result");
  };
  return (
    <View>
      <Text>LoadingScreen</Text>
      <Button title={"遷移"} onPress={handleNavigation}></Button>
    </View>
  );
};

export default LoadingScreen;
