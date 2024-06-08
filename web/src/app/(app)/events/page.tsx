"use client"
import React from "react";
import { useTable } from "react-table";
import { columns, data } from "./tableData";
import "./styles.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

export default function App() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  const router = useRouter();
  const handleClickPictures = () => {
    router.push(`/events/create`);
  };

  return (
    // <div>
    // <Tittle />
    <PageTemplate titleLabel="イベント一覧">
    <div style={{display:"flex",justifyContent:"end",padding:0,marginBottom:10}}>    
      <Button onClick={handleClickPictures} label="イベント登録" />
    
    </div>

    <table {...getTableProps()}>      
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
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
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </PageTemplate>
    // </div>
    
  );
}

export function Tittle() {
  return (
    <h1>
      イベント一覧
    </h1>
  );
}



