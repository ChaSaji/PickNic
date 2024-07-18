import { ApiResponse } from "@/types/utils";
import { fetchAPIWithAuth } from "./helper";
import { Event, EventDetail } from "@/types/event";
import { ApiError } from "./ApiError";

export const getEvent = async ({
  eventId,
}: {
  eventId: string;
}): Promise<ApiResponse<EventDetail | null>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: `events/${eventId}`,
      method: "GET",
    });

    const data = {
      id: response.event_id,
      name: response.event_name,
      startDate: response.start_date,
      endDate: response.end_date,
      badgeImg: response.badge_img,
      badgeName: response.bade_name,
      overview: response.overview,
      targetImg: response.target_img,
      targetName: response.target_name,
      latitude: response.latitude,
      longitude: response.longitude,
    };

    return { success: true, message: "イベント取得に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};

export const getEventList = async (): Promise<ApiResponse<Event[]>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: "events",
      method: "GET",
    });

    // TODO: userがany型になってしまった。fetchAPIにジェネリックで型指定する必要有
    const data = response.map((event: any) => ({
      id: event.event_id,
      name: event.event_name,
      startDate: event.start_date,
      endDate: event.end_date,
    }));

    return { success: true, message: "イベント取得に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};
