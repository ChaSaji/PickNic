import { ApiResponse } from "@/types/utils";
import { fetchAPIWithAuth } from "./helper";
import { Event, EventDetail } from "@/types/event";
import { ApiError } from "./ApiError";
import { eventSchemaType, eventPutSchemaType } from "@/schemas/eventSchema";
import { encodeImage } from "@/lib/utils/encodeImage"

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
      badgeName: response.badge_name,
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

export const postEventForm = async (
  event: eventSchemaType
): Promise<ApiResponse<Event>> => {
  const fileList = event.targetImg

  // バリデーション: ファイルが1つ選択されているかどうかを確認
  if (!fileList || fileList.length !== 1) {
    console.error('画像ファイルが選択されていません');
  }

  const dataURL = await encodeImage(fileList[0])

  await fetch(`/api/r2?key=123/target.jpg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({key: '123/target.jpg', body: dataURL}),
  });

  try {
    const response = await fetchAPIWithAuth({
      endpoint: "events/create",
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        event_name: event.name,
        start_date: event.startDate,
        end_date: event.endDate,
        overview: event.overview,
        // badge_img: event.badgeImg,
        badge_img: "",
        badge_name: event.badgeName,
        // target_img: event.targetImg,
        target_img: "",
        target_name: event.targetName,
        latitude: event.latitude,
        longitude: event.longitude,
      },
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

    return { success: true, message: "イベント作成に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};

export const putEventForm = async ({
  id,
  body,
}: eventPutSchemaType): Promise<ApiResponse<Event>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: `events/${id}/edit`,
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        event_name: body.name,
        start_date: body.startDate,
        end_date: body.endDate,
        overview: body.overview,
        // badge_img: body.badgeImg,
        badge_img: "",
        badge_name: body.badgeName,
        // target_img: body.targetImg,
        target_img: "",
        target_name: body.targetName,
        latitude: body.latitude,
        longitude: body.longitude,
        status: true,
      },
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

    return { success: true, message: "イベント更新に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};

export const deleteEvent = async ({
  id,
}: {
  id: string;
}): Promise<ApiResponse<Event>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: `events/${id}/delete`,
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
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

    return { success: true, message: "イベント削除に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};
