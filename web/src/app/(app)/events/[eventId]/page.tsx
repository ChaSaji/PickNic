"use client";

import Button from "@/components/Button/Button";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { EventDetail } from "@/types/event";
import { deleteEvent, getEvent } from "@/lib/api/event";
import { toast } from "react-toastify";
import { useApiSubmit } from "@/hooks/useApiSubmit";
import DetailText from "@/components/DetailText/DetailText";

const EventDetailPage = () => {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params["eventId"] as string;
  const { onApiSubmit } = useApiSubmit(deleteEvent);

  const handleClickBack = () => {
    router.push(`/events`);
  };
  const handleClickPictures = () => {
    router.push(`/events/${eventId}/pictures`);
  };
  const handleClickEdit = () => {
    router.push(`/events/${eventId}/edit`);
  };
  const handleClickDelete = async () => {
    const result = await onApiSubmit({ id: eventId });
    if (result.success) {
      router.push("/events");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await getEvent({ eventId: eventId });
        result.data && setEvent(result.data);
        if (!result.success) {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error fetching data:");
      }
    })();
  }, []);

  return (
    <PageTemplate titleLabel="イベント詳細">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button onClick={handleClickBack} label="戻る" />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={handleClickDelete} label="削除" />
          <Button onClick={handleClickEdit} label="編集" />
          <Button onClick={handleClickPictures} label="写真一覧" />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 10,
        }}
      >
        {event && (
          <>
            <DetailText label="イベント名" value={event.name} />
            <DetailText label="概要" value={event.overview} />
            <DetailText
              label="期間"
              value={`${event.startDate} ~ ${event.endDate}`}
            />
            {/* <DetailText label="バッジ画像" value={event.badgeImg} /> */}
            <DetailText label="撮影対象" value={event.targetImg} />
            <DetailText
              label="座標"
              value={`（緯度：${event.latitude}、経度：${event.longitude}）`}
            />
          </>
        )}
      </div>
    </PageTemplate>
  );
};

export default EventDetailPage;
