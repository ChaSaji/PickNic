"use client";

import Button from "@/components/Button/Button";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

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

  const eventInfo = {
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
    <PageTemplate titleLabel="イベント一覧">
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
      >
        <EventDetailText label="イベント名" value={eventInfo.name} />
        <EventDetailText label="概要" value={eventInfo.overview} />
        <EventDetailText
          label="期間"
          value={`${eventInfo.startDate} ~ ${eventInfo.endDate}`}
        />
        <EventDetailText label="バッジ画像" value={eventInfo.img} />
        <EventDetailText label="撮影対象" value={eventInfo.photTarget} />
        <EventDetailText
          label="座標"
          value={`（経度：${eventInfo.longitude}、 緯度：${eventInfo.latitude}）`}
        />
      </div>
    </PageTemplate>
  );
};

export default EventDetailPage;
