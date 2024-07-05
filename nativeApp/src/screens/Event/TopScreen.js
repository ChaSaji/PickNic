import { View, ScrollView, StyleSheet } from "react-native";
import EventCard from "../../components/EventCard";
import { useEffect, useState } from "react";
import { getEvents } from "../../lib/api/event";

const TopScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const handleNavigation = (eventId) => {
    navigation.navigate("Detail", { eventId });
  };

  useEffect(() => {
    (async () => {
      const eventData = await getEvents();
      setEvents(eventData);
    })();
  }, []);

  if (events.length == 0) return;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {events.map((event, index) => (
          <EventCard
            key={index}
            onPress={() => handleNavigation(event.id)}
            backgroundColor="#E6F6C7"
            {...event}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 8,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default TopScreen;
