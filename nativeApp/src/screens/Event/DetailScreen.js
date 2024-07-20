import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { getRandomPointInRadius } from "../../lib/getRandomPointInRadius";
import MyButton from "../../components/MyButton";
import { getEventDetail } from "../../lib/api/event";

const DetailScreen = ({ route, navigation }) => {
  const [event, setEvent] = useState(null);
  const eventId = route.params.eventId;
  const eventName = route.params.eventName;

  useEffect(() => {
    (async () => {
      if (!eventId) return;
      const eventData = await getEventDetail(eventId);
      setEvent(eventData);
    })();
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: eventName,
    });
  }, []);

  const handleNavigation = () => {
    const randomCenter = getRandomPointInRadius(
      event.latitude,
      event.longitude,
      200
    );
    navigation.navigate("Map", {
      eventId: eventId,
      eventName: event.event_name,
      latitude: randomCenter.latitude,
      longitude: randomCenter.longitude,
    });
  };

  const handleNavigateRanking = () => {
    navigation.navigate("Ranking", {
      eventId: eventId,
      eventName: event.event_name,
    });
  };

  if (!event) return;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>ターゲット</Text>
        <Image
          style={styles.image}
          source={require("../../../assets/sample.jpg")}
        />
        <Text style={styles.organizer}>主催者: {event.organizer}</Text>
        <Text style={styles.date}>
          {event.startDate} ~ {event.endDate}
        </Text>
        <Text style={styles.overview}>{event.overview}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <MyButton onPress={handleNavigation} label={"探す"} />
        <MyButton
          onPress={handleNavigateRanking}
          label={"ランキング"}
          fontSize={30}
        />
      </View>
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
  section: {
    marginBottom: 10,
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
  buttonContainer: {
    display: "flex",
    gap: 10,
  },
});
export default DetailScreen;
