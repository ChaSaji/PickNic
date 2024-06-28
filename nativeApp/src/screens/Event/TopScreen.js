import { View, ScrollView, StyleSheet } from "react-native";
import EventCard from "../../components/EventCard";

const TopScreen = ({ navigation }) => {
  const handleNavigation = (eventId) => {
    navigation.navigate("Detail", { eventId });
  };

  const sampleEvents = [
    {
      id: 1,
      name: "浜松まつり",
      organizer: "浜松市観光協会",
      startDate: "2023-05-03",
      endDate: "2023-05-05",
    },
    {
      id: 2,
      name: "札幌雪まつり",
      organizer: "札幌観光協会",
      startDate: "2024-02-04",
      endDate: "2024-02-11",
    },
    {
      id: 3,
      name: "祇園祭",
      organizer: "祇園祭実行委員会",
      startDate: "2023-07-01",
      endDate: "2023-07-31",
    },
    {
      id: 4,
      name: "ねぶた祭",
      organizer: "青森観光協会",
      startDate: "2023-08-02",
      endDate: "2023-08-07",
    },
    {
      id: 5,
      name: "天神祭",
      organizer: "大阪観光局",
      startDate: "2023-07-24",
      endDate: "2023-07-25",
    },
    {
      id: 6,
      name: "神田祭",
      organizer: "神田明神",
      startDate: "2023-05-11",
      endDate: "2023-05-15",
    },
    {
      id: 7,
      name: "長岡まつり",
      organizer: "長岡市観光協会",
      startDate: "2023-08-01",
      endDate: "2023-08-03",
    },
    {
      id: 8,
      name: "青森ねぶた祭",
      organizer: "青森ねぶた祭実行委員会",
      startDate: "2023-08-02",
      endDate: "2023-08-07",
    },
    {
      id: 9,
      name: "徳島阿波おどり",
      organizer: "徳島市観光協会",
      startDate: "2023-08-12",
      endDate: "2023-08-15",
    },
    {
      id: 10,
      name: "仙台七夕まつり",
      organizer: "仙台観光協会",
      startDate: "2023-08-06",
      endDate: "2023-08-08",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {sampleEvents.map((event, index) => (
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
