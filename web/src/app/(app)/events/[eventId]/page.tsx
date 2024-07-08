"use client";

import Button from "@/components/Button/Button";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import axios from 'axios';

type PropsType = {
  label: string;
  value: string;
};

// 型定義
type EventData = {
  event_name: string;
  organizer: string;
  start_date: string;
  end_date: string;
  overview: string;
  badge_img: string;
  target_img: string;
  target_name: string;
  latitude: number;
  longitude: number;
  id: number;
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
  const [event, setItems] = useState<EventData | null>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params["eventId"];


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
        const response = await axios.get(`http://localhost:8000/events/${eventId}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <PageTemplate titleLabel="イベント詳細">
      <div style={{ display: "flex", justifyContent: "end", gap: 10 }}>
        <Button onClick={handleClickPictures} label="写真一覧" />
        <Button onClick={handleClickEdit} label="編集" />
        <Button onClick={handleClickPublick} label="公開する" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 10,
        }}
      >{event && (
        <>
        <EventDetailText label="イベント名" value={event.event_name} />
        <EventDetailText label="概要" value={event.overview} />
        <EventDetailText
          label="期間"
          value={`${event.start_date} ~ ${event.end_date}`}
        />
        <EventDetailText label="バッジ画像" value={event.badge_img} />
        <EventDetailText label="撮影対象" value={event.target_img} />
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
