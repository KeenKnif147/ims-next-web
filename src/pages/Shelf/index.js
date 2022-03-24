import React from "react";
import { Table } from "antd";

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

export default function Shelf() {
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      render: (text) => <a>{text}</a>,
      // fixed: 'left',
      width: 100,
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse",
      width: 200,
    },
    {
      title: "State",
      dataIndex: "state",
      width: 200,
    },
    {
      title: "Location",
      width: 200,
      dataIndex: "location",
    },
    {
      title: "Number of SKU",
      dataIndex: "numberOfSKU",
      width: 200,
    },
    {
      title: "Size type",
      dataIndex: "sizeType",
      width: 200,
    },
    {
      title: "NVVC",
      width: 200,
      dataIndex: "NVVC",
    },
  ];

  const data = [
    {
      key: "1",
      code: "T8303000012",
      warehouse: "WH-MFD4",
      state: "Empty",
      location: "mfd4-Kho hàng bán",
      numberOfSKU: "5",
      sizeType: "S",
      NVVC: "",
    },
    {
      key: "2",
      code: "T8303000012",
      warehouse: "WH-MFD4",
      state: "Empty",
      location: "mfd4-Kho hàng bán",
      numberOfSKU: "5",
      sizeType: "S",
      NVVC: "",
    },
    {
      key: "3",
      code: "T8303000012",
      warehouse: "WH-MFD4",
      state: "Empty",
      location: "mfd4-Kho hàng bán",
      numberOfSKU: "5",
      sizeType: "S",
      NVVC: "",
    },
    {
      key: "4",
      code: "T8303000012",
      warehouse: "WH-MFD4",
      state: "Empty",
      location: "mfd4-Kho hàng bán",
      numberOfSKU: "5",
      sizeType: "S",
      NVVC: "",
    },
    {
      key: "5",
      code: "T8303000012",
      warehouse: "WH-MFD4",
      state: "Empty",
      location: "mfd4-Kho hàng bán",
      numberOfSKU: "5",
      sizeType: "S",
      NVVC: "",
    },
  ];

  return (
    <Table
      style={{ maxWidth: "100%" }}
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
      scroll={{ x: true }}
    />
  );
}
