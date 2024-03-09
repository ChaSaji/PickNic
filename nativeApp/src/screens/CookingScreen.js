import React from "react";
import { Text, View,StyleSheet,Image,Button } from "react-native";
import { StatusBar } from 'expo-status-bar';

const CookingScreen = () => {
  return (
    <View style={styles.container}>
      {[...Array(3)].map((_, index) => (
        <View style={styles.recipView}>
          <View style={{width: '30%',height: '100%',justifyContent: 'center',    alignItems: 'center',}}>
            <Image
              source={require("../../assets/icons8-camera-64.png")}
              style={{ width: 75, height: 75 }}
            />
          </View>
          <View style={{width: '40%',height: '100%',justifyContent: 'center'}}>
            {[...Array(4)].map((_, index) => (
              <Text>
                ・じゃがいも
              </Text>
            ))}
          </View>
          <View style = {{width: '20%',justifyContent: 'center'}}>
              <Button 
                title="Cooking!"
                onPress={()=> alert("ボタンが押されました")}
              />
          </View>
        </View>
      ))}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipView: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F8DAD1',
    margin: 5,
  },
});

export default CookingScreen;

