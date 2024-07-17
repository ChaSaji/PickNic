"use client";
import React from "react";
import { useTable } from "react-table";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { Column } from "react-table";
import { useState, useEffect } from "react";
import { getUserList } from "@/lib/api/user";
import { User } from "@/types/user";

const columns: Column<User>[] = [
  {
    Header: "ユーザ名",
    accessor: "name",
    Cell: ({ row }) => (
      <a
        href={`/users/${row.original.id}`}
        style={{ textDecoration: "none", color: "blue" }}
      >
        {row.values.name}
      </a>
    ),
  },
  { Header: "メールアドレス", accessor: "email" },
];

export default function UserListPage() {
  const [users, setUsers] = useState<Array<User>>([]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: users });
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/users/create`);
  };

  useEffect(() => {
    (async () => {
      const users = await getUserList();
      users.data && setUsers(users.data);
    })();
  }, []);

  return (
    <PageTemplate titleLabel="ユーザ一覧">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: 0,
            marginBottom: 10,
          }}
        >
          <Button onClick={handleNavigate} label="ユーザ登録" />
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
      </div>
    </PageTemplate>
  );
}
