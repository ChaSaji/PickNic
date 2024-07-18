"use client";
import React from "react";
import { useTable } from "react-table";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { Column } from "react-table";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Event } from "@/types/event";
import { getEventList } from "@/lib/api/event";
import { toast } from "react-toastify";

// columns 配列に型を適用
const columns: Column<Event>[] = [
  {
    Header: "イベント名",
    accessor: "name",
    Cell: ({ row }) => (
      <a
        href={`/events/${row.original.id}`}
        style={{ textDecoration: "none", color: "blue" }}
      >
        {row.values.name}
      </a>
    ),
  },
  { Header: "開始日", accessor: "startDate" },
  { Header: "終了日", accessor: "endDate" },
];

export default function EventListPage() {
  const { logout } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: events,
    });
  const router = useRouter();
  const handleClickPictures = () => {
    router.push(`/events/create`);
  };

  const handleLogout = async () => await logout();

  useEffect(() => {
    (async () => {
      const result = await getEventList();
      result.data && setEvents(result.data);
      if (!result.success) {
        toast.error(result.message);
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
      <Button onClick={() => router.push("/login")} label="ログイン用" />
      <Button onClick={handleLogout} label="ログアウト用" />
    </PageTemplate>
  );
}
