import { Button, Text, View } from "react-native";

const ResultScreen = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("Event");
  };
  return (
    <View>
      <Text>ResultScreen</Text>
      <Button title={"遷移"} onPress={handleNavigation}></Button>
    </View>
  );
};

export default ResultScreen;
