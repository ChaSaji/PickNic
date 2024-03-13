import sendImage from "../lib/sendPicture";
import { selectData } from "../lib/dataBaseHelper";
import { RO, Material } from "../lib/databaseQueryText";
import getRandomNum from "../lib/getRandomNum";
import LoadingAnimationScreen from "./LoadingAnimationScreen";

const SubmitToAPIScreen = ({ route, navigation }) => {
  const uri = route.params.picture.uri;

  const getImageProcessingPicture = async (uri) => {
    const response = await sendImage({ uri: uri });
    selectData(
      Material.tablename,
      Material.elementsKey.colorId,
      RO.Eqqual,
      response.return
    ).then((materials) => {
      if (materials.length > 0) {
        const randomIndx = getRandomNum(materials.length);
        navigation.navigate("GetMaterial", {
          getMaterial: materials[randomIndx],
        });
      } else {
        console.log(
          `colorId == ${response.return}のマテリアルが登録されていません`
        );
      }
    });
  };

  if (route != null) {
    getImageProcessingPicture(uri);
  }

  return <LoadingAnimationScreen />;
};

export default SubmitToAPIScreen;
