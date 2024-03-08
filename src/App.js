import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreenNavigator from "./navigation/stacks/HomeStack";
import CookingScreenNavigator from "./navigation/stacks/CookingStack";
import BagScreenNavigator from "./navigation/stacks/BagStack";
import BadgeScreenNabigator from "./navigation/stacks/BadgeStack";


const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home_tab"
      activeColor="#f0edf6" // タッチした時の文字色
      inactiveColor="#3e2465" //他のタブがタッチされている時の文字色
      barStyle={{ backgroundColor: "#ffd700" }} //タブの背景色
    >
      <Tab.Screen
        name="Home_tab"
        component={HomeScreenNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            //ここいじれば動的にアイコンサイズ変えられそうだなと思ったけど未実装
            <MaterialCommunityIcons name="home" color={"#3e2465"} size={26} /> //ここ変えれば好きなアイコンにできるぽい
          ),
        }}
      />
      <Tab.Screen
        name="Cooking_tab"
        component={CookingScreenNavigator}
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
        name="Bag_tab"
        component={BagScreenNavigator}
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
        name="Badge_tab"
        component={BadgeScreenNabigator}
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
