import { formatDate } from "../util/dateFormatter";
import { fetchAPI } from "./helper";

export const getEvents = async () => {
  const data = await fetchAPI({ endpoint: "events" });
  const eventData = data.map((event) => {
    return {
      id: event.id,
      name: event.event_name,
      organizer: event.organizer,
      startDate: formatDate(event.start_date),
      endDate: formatDate(event.end_date),
    };
  });

  return eventData;
};
