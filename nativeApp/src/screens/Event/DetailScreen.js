import { useLayoutEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const DetailScreen = ({ route, navigation }) => {
  // TODO: eventIdからeventをfetch
  const eventId = route.params.eventId;

  const event = {
    event_name: "浜松まつり",
    organizer: "浜松市観光協会",
    start_date: "2023-05-03",
    end_date: "2023-05-05",
    overview:
      "浜松まつりは、静岡県浜松市で毎年5月に開催される伝統的なお祭りです。凧揚げや夜の御殿屋台引き回しが見どころです。",
    badge_img: "https://example.com/images/hamamatsu_badge.jpg",
    target_img: "https://example.com/images/hamamatsu.jpg",
    target_name: "浜松城",
    latitude: 34.7108,
    longitude: 137.7266,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: event.event_name,
    });
  }, []);

  const handleNavigation = () => {
    navigation.navigate("Map", {
      eventName: event.event_name,
      latitude: event.latitude,
      longitude: event.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.title}>ターゲット</Text>
          <Image
            style={styles.image}
            source={require("../../../assets/sample.jpg")}
          />
          <Text style={styles.organizer}>主催者: {event.organizer}</Text>
          <Text style={styles.date}>
            {event.start_date} ~ {event.end_date}
          </Text>
          <Text style={styles.overview}>{event.overview}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleNavigation()}
          style={styles.button.outerRadius}
        >
          <View style={styles.button.innerRadius}>
            <Text style={styles.button.text}>探す</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#E6F6C7",
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 20,
  },
  section: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    margin: 5,
  },
  organizer: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  date: {
    fontSize: 14,
    marginVertical: 5,
  },
  overview: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    outerRadius: {
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      height: 80,
      borderRadius: 100,
      backgroundColor: "#4BBC96",
    },
    innerRadius: {
      justifyContent: "center",
      alignItems: "center",
      width: 190,
      height: 70,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: "white",
    },
    text: {
      color: "white",
      fontSize: 25,
      fontWeight: "bold",
      lineHeight: 35,
    },
  },
});
export default DetailScreen;
