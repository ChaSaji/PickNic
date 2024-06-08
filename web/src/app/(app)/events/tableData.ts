import { Column } from 'react-table';

// 型定義
type EventData = {
  eventname: string;
  hostname: string;
  period: string;
};

// columns 配列に型を適用
export const columns: Column<EventData>[] = [
  { Header: "イベント名", accessor: "eventname" },
  { Header: "主催団体名", accessor: "hostname" },
  { Header: "期間", accessor: "period" }
];

// data 配列に型を適用
export const data: EventData[] = [
  {
    eventname: "桜祭り",
    hostname: "浜松市役所",
    period: "2024/04/01~2024/04/30"
  },
  {
    eventname: "バナナ",
    hostname: "100円",
    period: "200"
  }
];