import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image
} from 'react-native';

const BadgeScreen = () => {
  return (
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
    }]}>
      <View style={{ flex: 1, backgroundColor: "pink", justifyContent: "center", alignItems: "center" }}>
        <Text>称号</Text>
      </View>
      <SafeAreaView style={{flex: 9}}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.badge}>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png',}} style={styles.icon}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 0,
  },
  text: {
    fontSize: 42,
  },
  badge: {
    flexWrap: 'wrap',
    marginTop: 8,
    backgroundColor: 'aliceblue',
    maxHeight: 400,
    flexDirection: 'row',
  },
  icon: {
    width: 80,
    height: 80,
  }
});

export default BadgeScreen;

/*
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
} from 'react-native';

const ImageDisplay = ({ imagePath }) => {
  return (
    <Image source={{uri: `file://../../asset/${imagePath}`}} style={styles.image} />
    //<Image source={require(`../../assets/${imagePath}`)} style={styles.image} />
  );
};

const BadgeScreen = () => {
  const imagePaths = [
    'p_cat1.png',
    'favicon.png',
    'favicon.png',
    'favicon.png',
    'favicon.png',
  ];
  return (
    <View style={[styles.container, {
      flexDirection: "column"
    }]}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.badge}>
            {imagePaths.map((path, index) => (
            <ImageDisplay key={index} imagePath={path}
            />))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 0,
  },
  text: {
    fontSize: 42,
  },
  badge: {
    flexWrap: 'wrap',
    marginTop: 8,
    backgroundColor: 'aliceblue',
    maxHeight: 400,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
});


export default BadgeScreen;*/