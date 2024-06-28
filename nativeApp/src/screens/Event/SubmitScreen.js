import { Button, Text, View } from "react-native";

const SubmitScreen = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("Loading");
  };
  return (
    <View>
      <Text>SubmitScreen</Text>
      <Button title={"遷移"} onPress={handleNavigation}></Button>
    </View>
  );
};

export default SubmitScreen;
