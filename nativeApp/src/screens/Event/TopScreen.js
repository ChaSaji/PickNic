import { Text, View, Button } from "react-native";

const TopScreen = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("Detail");
  };

  return (
    <View>
      <Text>TopScreen</Text>
      <Button title={"to DetailPage"} onPress={handleNavigation} />
    </View>
  );
};

export default TopScreen;
