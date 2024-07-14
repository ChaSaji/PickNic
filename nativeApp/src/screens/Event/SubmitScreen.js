import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useCamera } from "../../context/CameraContext";
import { useLayoutEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import MyButton from "../../components/MyButton";
import sendImage from "../../lib/sendPicture";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SubmitScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { picture } = useCamera();

  const eventId = route.params.eventId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !loading,
      headerBackTitle: "撮り直す",
    });
  }, [loading, navigation]);

  const handleSubmitToAPI = async () => {
    setLoading(true);
    try {
      const score = await sendImage({
        uri: picture.uri,
        endpoint: `events/${eventId}/uploadfile`,
      });

      setLoading(false);

      navigation.navigate("Result", {
        score: Math.round(parseFloat(score.return)),
      });
    } catch (error) {}
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.container}>
      <Image source={{ uri: picture.uri }} style={styles.image} />

      <View style={styles.buttonContainer}>
        <MyButton onPress={handleSubmitToAPI} label={"採点"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: windowWidth * 0.7,
    height: windowHeight * 0.7,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
});

export default SubmitScreen;
