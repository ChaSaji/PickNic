import { formatDate } from "../util/dateFormatter";
import { fetchAPI } from "./helper";

export const getEvents = async () => {
  const data = await fetchAPI({ endpoint: "events" });
  const eventData = data.map((event) => {
    return {
      id: event.event_id,
      name: event.event_name,
      organizer: event.organization,
      startDate: formatDate(event.start_date),
      endDate: formatDate(event.end_date),
    };
  });

  return eventData;
};

export const getEventDetail = async (eventId) => {
  const data = await fetchAPI({ endpoint: `events/${eventId}` });
  const eventData = {
    id: data.id,
    name: data.event_name,
    organizer: data.organization,
    startDate: formatDate(data.start_date),
    endDate: formatDate(data.end_date),
    latitude: data.latitude,
    longitude: data.longitude,
    overview: data.overview,
    badgeUrl: data.badge_img,
    targetUrl: data.target_img,
    targetName: data.target_name,
  };

  return eventData;
};
