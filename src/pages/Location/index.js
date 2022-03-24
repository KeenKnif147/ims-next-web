import React from "react";
import { Layout, Menu, Table } from "antd";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

export default function Location() {
  const columns = [
    {
      title: "Location",
      dataIndex: "location",
      render: (text) => <a>{text}</a>,
      width: "70vw",
    },
    {
      title: "Location Type",
      dataIndex: "locationType",
      width: "30vw",
    },
  ];

  const data = [
    {
      key: "1",
      location:
        "Physical Locations / TIKI OFFLINE / offline-Kho Hàng Offline TCH",
      locationType: "	Internal Location",
    },
    {
      key: "2",
      location:
        "Physical Locations / TIKI OFFLINE / offline-Kho Hàng Offline TCH",
      locationType: "	Internal Location",
    },
    {
      key: "3",
      location:
        "Physical Locations / TIKI OFFLINE / offline-Kho Hàng Offline TCH",
      locationType: "	Internal Location",
    },
    {
      key: "4",
      location:
        "Physical Locations / TIKI OFFLINE / offline-Kho Hàng Offline TCH",
      locationType: "	Internal Location",
    },
    {
      key: "5",
      location:
        "Physical Locations / TIKI OFFLINE / offline-Kho Hàng Offline TCH",
      locationType: "	Internal Location",
    },
  ];
  return (
    <Table
      style={{ width: "100%" }}
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
    />
  );
}
