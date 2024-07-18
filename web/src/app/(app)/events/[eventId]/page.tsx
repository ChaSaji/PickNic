"use client";

import Button from "@/components/Button/Button";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { EventDetail } from "@/types/event";
import { getEvent } from "@/lib/api/event";
import { toast } from "react-toastify";

type PropsType = {
  label: string;
  value: string;
};

const EventDetailText = (props: PropsType) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "dashed",
        marginTop: 10,
        paddingBottom: 10,
      }}
    >
      <div style={{ display: "flex", fontSize: 20, fontWeight: 600 }}>
        {props.label}
      </div>
      <div style={{ display: "flex", paddingLeft: 20 }}>{props.value}</div>
    </div>
  );
};

const EventDetailPage = () => {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params["eventId"] as string;

  const handleClickBack = () => {
    router.push(`/events`);
  };
  const handleClickPictures = () => {
    router.push(`/events/${eventId}/pictures`);
  };
  const handleClickEdit = () => {
    router.push(`/events/${eventId}/edit`);
  };
  const handleClickPublick = () => {
    console.log("公開する");
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
          <Button onClick={handleClickPictures} label="写真一覧" />
          <Button onClick={handleClickEdit} label="編集" />
          <Button onClick={handleClickPublick} label="公開する" />
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
            <EventDetailText label="イベント名" value={event.name} />
            <EventDetailText label="概要" value={event.overview} />
            <EventDetailText
              label="期間"
              value={`${event.startDate} ~ ${event.endDate}`}
            />
            <EventDetailText label="バッジ画像" value={event.badgeImg} />
            <EventDetailText label="撮影対象" value={event.targetImg} />
            <EventDetailText
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
