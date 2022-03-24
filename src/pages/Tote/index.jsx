import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  AutoComplete,
  Input,
  Descriptions,
  Table,
  Modal,
} from "antd";
import { DownOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { cloneDeep } from "lodash";

import "./index.scss";

const { Panel } = Collapse;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {},
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

export default function Tote() {
  const rawData = [
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
      warehouse: "WH-MFD5",
      state: "Empty",
      location: "mfd4-Kho hàng bán 6",
      numberOfSKU: "5",
      sizeType: "S",
      NVVC: "",
    },
    {
      key: "4",
      code: "T8303000016",
      warehouse: "WH-MFD6",
      state: "Empty",
      location: "mfd4-Kho hàng bán 3",
      numberOfSKU: "5",
      sizeType: "S",
      NVVC: "",
    },
    {
      key: "5",
      code: "T8303000015",
      warehouse: "WH-MFD4",
      state: "Empty",
      location: "mfd4-Kho hàng bán 2",
      numberOfSKU: "5",
      sizeType: "S",
      NVVC: "",
    },
  ];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [detailInformation, setDetailInformation] = useState(null);
  const [data, setData] = useState(rawData);
  const [searchTote, setSearchTote] = useState("");
  const [searchWarehouse, setSearchWarehouse] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [options, setOptions] = useState([]);
  // const [value, setValue] = useState("");
  // const [filterTote, setFilterTote] = useState([]);

  // console.log("filterTote", filterTote);

  useEffect(() => {
    setData(
      rawData.filter(
        (item) =>
          item?.code?.search(searchTote) != -1 &&
          item?.warehouse?.search(searchWarehouse) != -1 &&
          item?.location?.search(searchLocation) != -1
      )
    );
  }, [searchTote, searchWarehouse, searchLocation]);

  const onClickRow = (record) => {
    setIsOpenModal(!isOpenModal);
    setDetailInformation(record);
  };

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
    {
      title: "Action",
      width: 200,
      dataIndex: "key",
      render: (text, record, index) => (
        <SearchOutlined
          onClick={() => onClickRow(record)}
          style={{ color: "#0766ba" }}
          className="cursor-pointer"
        />
      ),
    },
  ];

  const closeModal = () => {
    setIsOpenModal(false);
    setDetailInformation(null);
  };

  const handleOnChangeSearch = (event, key) => {
    setData(
      rawData.filter((item) => item?.[key]?.search(event.target.value) != -1)
    );
  };

  const mockVal = (str, repeat = 1) => ({
    value: data.repeat(repeat),
  });

  const onSearch = (searchText) => {
    const filteredTote = data?.filter(
      (item) => item.code?.search(searchText) !== -1
    );
    const slicedFilteredTote = filteredTote?.slice(0, 3);

    setOptions(
      !searchText && slicedFilteredTote
        ? []
        : slicedFilteredTote?.map((item, index) => ({
            key: index,
            value: item.code,
          }))
    );
  };

  const onSelect = (data) => {
    // const filterToteClone = cloneDeep(filterTote);
    // filterToteClone.push(data);
    // setFilterTote(filterToteClone);
  };
  const onChange = (data) => {
    // setValue(data);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // const filterToteClone = cloneDeep(filterTote);
      // filterToteClone.push(event.target.value);
      // setFilterTote(filterToteClone);
    }
  };
  const clearFilter = (item) => {
    // setFilterTote([]);
  };

  const callback = (key) => {
    console.log(key);
  };

  const removeFilter = (item) => {
    // setFilterTote(filterTote?.filter((filterItem) => filterItem !== item));
  };

  return (
    <div>
      <Collapse defaultActiveKey={["1"]} onChange={callback}>
        <Panel
          showArrow={false}
          header={
            <div className="flex items-center">
              Filter <DownOutlined style={{ fontSize: 8 }} className="ml-2" />
            </div>
          }
          key="1"
          // extra={<SearchOutlined />}
        >
          <div className="flex items-center justify-start ">
            <AutoComplete
              options={options}
              style={{
                width: 200,
                borderRadius: 5,
                marginBottom: 16,
                marginRight: 16,
              }}
              onSelect={onSelect}
              onKeyDown={handleKeyDown}
              onSearch={onSearch}
              placeholder="Search Tote..."
              value={searchTote}
              onChange={setSearchTote}
            />
            <Input
              onChange={(event) => setSearchWarehouse(event.target.value)}
              placeholder="Search WareHouse..."
              style={{
                width: 200,
                borderRadius: 5,
                marginBottom: 16,
                marginRight: 16,
              }}
            />
            <Input
              onChange={(event) => setSearchLocation(event.target.value)}
              placeholder="Search Location..."
              style={{
                width: 200,
                borderRadius: 5,
                marginBottom: 16,
                marginRight: 16,
              }}
            />
          </div>
          {/* <div className="flex items-center justify-center ">
            <div
              className=" flex items-center mb-4"
              style={{
                visibility: filterTote.length > 0 ? "visible" : "hidden",
                height: filterTote.length > 0 ? 30 : 0,
              }}
            >
              <strong>{`Filter( ${filterTote.length} kết quả ) :`}</strong>
              {filterTote?.map((item, item) => (
                <div
                  className="flex items-center ml-4 filter-item cursor-pointer"
                  onClick={() => removeFilter(item)}
                >
                  <span className="text-sx">Tote: {item}</span>
                  <CloseOutlined
                    className="ml-2 mb-2"
                    style={{ fontSize: 10 }}
                  />
                </div>
              ))}
              <Button
                onClick={clearFilter}
                size="small"
                shape="round"
                className=" ml-4 text-xs mt-1"
              >
                Clear All
              </Button>
            </div>
          </div> */}
        </Panel>
      </Collapse>

      <Table
        style={{ maxWidth: "100%" }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        bordered
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
      />
      <Modal
        title={detailInformation?.code}
        style={{ top: 20 }}
        visible={isOpenModal}
        onOk={closeModal}
        onCancel={closeModal}
        width={1000}
      >
        <Descriptions title="Tote Info">
          <Descriptions.Item label="Location">
            {detailInformation?.location}
          </Descriptions.Item>
          <Descriptions.Item label="Number Of SKU">
            {detailInformation?.numberOfSKU}
          </Descriptions.Item>
          <Descriptions.Item label="Size type">
            {detailInformation?.sizeType}
          </Descriptions.Item>
          <Descriptions.Item label="NVVC">
            {detailInformation?.NVVC || "No"}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
}
