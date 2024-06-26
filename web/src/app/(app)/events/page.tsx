"use client";
import React from "react";
import { useTable } from "react-table";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { Column } from "react-table";

// 型定義
type EventData = {
  eventname: string;
  hostname: string;
  period: string;
};

// columns 配列に型を適用
const columns: Column<EventData>[] = [
  { Header: "イベント名", accessor: "eventname" },
  { Header: "主催団体名", accessor: "hostname" },
  { Header: "期間", accessor: "period" },
];

// data 配列に型を適用
const data: EventData[] = [
  {
    eventname: "桜祭り",
    hostname: "浜松市役所",
    period: "2024/04/01~2024/04/30",
  },
  {
    eventname: "バナナ",
    hostname: "100円",
    period: "200",
  },
];

export default function EventListPage() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const router = useRouter();
  const handleClickPictures = () => {
    router.push(`/events/create`);
  };

  return (
    <PageTemplate titleLabel="イベント一覧">
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          padding: 0,
          marginBottom: 10,
        }}
      >
        <Button onClick={handleClickPictures} label="イベント登録" />
      </div>

      <table
        style={{
          textAlign: "center",
          width: "100%",
          borderSpacing: 0,
          tableLayout: "fixed",
          border: "solid 1px #000",
        }}
        {...getTableProps()}
      >
        <thead
          style={{
            textAlign: "center",
          }}
        >
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column, idx) => (
                <th
                  style={{
                    width: "80%",
                    tableLayout: "fixed",
                    border: "1.5px #7e7e7e solid",
                  }}
                  {...column.getHeaderProps()}
                  key={idx}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      style={{
                        width: "80%",
                        tableLayout: "fixed",
                        border: "1.5px #7e7e7e solid",
                      }}
                      {...cell.getCellProps()}
                      key={i}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </PageTemplate>
  );
}
