import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

const DetailScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      // TODO: fetchしたevent名にするように
      title: "浜松まつり",
    });
  }, []);

  const eventId = route.params.eventId;
  return (
    <View>
      <Text>DetailScreen</Text>
      <Text>{eventId}</Text>
    </View>
  );
};

export default DetailScreen;
