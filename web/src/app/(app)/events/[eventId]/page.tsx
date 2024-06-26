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
  const [items, setItems] = useState<EventData | null>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params["eventId"];

  console.log(items)
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/events/${eventId}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const eventInfo =  {
    id: "",
    name: "浜松城バナナ合戦〜春の部〜",
    overview: "春が始まる...戦じゃ！皆のもの、バナナを持てぃ！",
    startDate: "2024/05/15",
    endDate: "2024/04/30",
    img: "",
    photTarget: "浜松城",
    latitude: 34,
    longitude: 135,
  };
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
      >{items && (
        <>
        <EventDetailText label="イベント名" value={items.event_name} />
        <EventDetailText label="概要" value={items.overview} />
        <EventDetailText
          label="期間"
          value={`${items.start_date} ~ ${items.end_date}`}
        />
        <EventDetailText label="バッジ画像" value={items.badge_img} />
        <EventDetailText label="撮影対象" value={items.target_img} />
        <EventDetailText
          label="座標"
          value={`（緯度：${items.latitude}、経度：${items.longitude}）`}
        />
        </>
      )}
      </div>
    </PageTemplate>
  );
};

export default EventDetailPage;
