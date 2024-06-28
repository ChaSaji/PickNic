import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

const MapScreen = ({ route, navigation }) => {
  const eventName = route.params.eventName;
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: eventName,
      headerBackTitle: "戻る",
    });
  }, []);

  return (
    <View>
      <Text>MapScreen</Text>
      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
    </View>
  );
};

export default MapScreen;
