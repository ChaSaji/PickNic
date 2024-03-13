import { StyleSheet, View, Image, Dimensions } from "react-native";
import { useCamera } from "../context/CameraContext";
import ChangeMaterialButton from "../components/ChangeMaterialButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PictureScreen = ({ navigation }) => {
  const { picture } = useCamera();
  console.log(picture)
  

  const handleSubmitToAPI = () => {
    navigation.navigate("SubmitToAPI", {
      picture:picture,
    });
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: picture.uri }} style={styles.image} />

      <View style={styles.buttonContainer}>
        <ChangeMaterialButton onPress={handleSubmitToAPI} />
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

export default PictureScreen;
