import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { getRandomPointInRadius } from "../../lib/getRandomPointInRadius";
import MyButton from "../../components/MyButton";
import { getEventDetail } from "../../lib/api/event";
import { S3_BUCKET_NAME } from "@env";
import { s3 } from "../../lib/r2/s3";

const DetailScreen = ({ route, navigation }) => {
  const [event, setEvent] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const eventId = route.params.eventId;
  const eventName = route.params.eventName;

  useEffect(() => {
    (async () => {
      if (!eventId) return;
      const eventData = await getEventDetail(eventId);
      const url = s3.getSignedUrl("getObject", {
        Bucket: S3_BUCKET_NAME,
        Key: eventData.targetName,
      });
      setEvent(eventData);
      setImageUrl(url);
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
      imageUrl: imageUrl,
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
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.organizer}>主催者: {event.organizer}</Text>
        <Text style={styles.date}>
          {event.startDate} ~ {event.endDate}
        </Text>
        <Text style={styles.overview}>{event.overview}</Text>
        {event.score != -1 && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoretext}>これまでの最高得点:</Text>
            <Text style={styles.score}>{event.score}</Text>
            <Text style={styles.scoretext}>点！！</Text>
          </View>
        )}
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
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  scoretext: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF914D",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    gap: 10,
  },
});
export default DetailScreen;
