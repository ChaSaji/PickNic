import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

const EventCard = ({
  name,
  organizer,
  startDate,
  endDate,
  onPress,
  backgroundColor,
}) => {
  const styles = StyleSheet.create({
    item: {
      height: 120,
      width: "97%",
      backgroundColor: backgroundColor,
      margin: 5,
      justifyContent: "center",
    },
    textContainer: {
      flex: 1,
      flexDirection: "col",
      justifyContent: "center",
      gap: 10,
    },
    titleContainer: {
      alignItems: "center",
    },
    descriptionContainer: {
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    description: {
      fontSize: 14,
      color: "#555",
    },
  });

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{organizer}</Text>
          <Text style={styles.description}>
            {startDate} ~ {endDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
