import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { selectDataById } from "../lib/dataBaseHelper";
import { MaterialPhotoRelation } from "../lib/databaseQueryText";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PictureViewScreen = ({ route, navigation }) => {
  //   //   写真がなんのmaterialに変換されたか持って来れる（多分）
  //   //   現段階で写真撮影時にmaterialに紐づかないためコメントアウト（今後の参考程度）
  //   const [materialInfo, setMaterialInfo] = useState();
  //   useEffect(() => {
  //     selectDataById(MaterialPhotoRelation.tablename)
  //       .then((data) => {
  //         // 本来ならこれで写真で変換されたマテリアルのIDがとって来れる
  //         // console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error occurred:", error); // エラーが発生した場合はエラーメッセージを出力
  //       });
  //   }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.uri }} style={styles.image} />
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
    width: windowWidth * 0.8,
    height: windowHeight * 0.8,
  },
});

export default PictureViewScreen;
