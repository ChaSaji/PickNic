"use client";
import React from "react";
import { useTable } from "react-table";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { Column } from "react-table";
import { useState, useEffect } from 'react';
import axios from 'axios';

// 型定義
type EventData = {
  event_name: string;
  organizer: string;
  start_date: string;
  end_date: string;
  id: string;
};


// columns 配列に型を適用
const columns: Column<EventData>[] = [
  { Header: "イベント名", accessor: "event_name" ,
    Cell:({ row }) => 
      (
      <a href={`/events/${row.values.id}`} style={{ textDecoration: "none", color: "blue"}}>
        {row.values.event_name}
      </a>
    )
  },
  { Header: "開始日", accessor: "start_date" },
  { Header: "終了日", accessor: "end_date" },
];

export default function EventListPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: events,
    });
  const router = useRouter();
  const handleClickPictures = () => {
    router.push(`/events/create`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

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
