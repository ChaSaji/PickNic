import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CookingScreen from "./screens/CookingScreen";
import CameraScreen from "./screens/CameraScreen";
import BagScreen from "./screens/BagScreen";
import BadgeScreen from "./screens/BadgeScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6" // タッチした時の文字色
      inactiveColor="#3e2465" //他のタブがタッチされている時の文字色
      barStyle={{ backgroundColor: "#ffd700" }} //タブの背景色
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            //ここいじれば動的にアイコンサイズ変えられそうだなと思ったけど未実装
            <MaterialCommunityIcons name="home" color={"#3e2465"} size={26} /> //ここ変えれば好きなアイコンにできるぽい
          ),
        }}
      />
      {/* カメラスクリーンはタブから移動しなくてもいいと思ったのでどうにか下のバーから消したい */}
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen
        name="Cooking"
        component={CookingScreen}
        options={{
          tabBarLabel: "Cooking",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              color={"#3e2465"}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bag"
        component={BagScreen}
        options={{
          tabBarLabel: "Bag",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="bag-personal"
              color={"#3e2465"}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Badge"
        component={BadgeScreen}
        options={{
          tabBarLabel: "Badge",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="medal-outline"
              color={"#3e2465"}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
