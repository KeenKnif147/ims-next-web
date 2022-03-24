import React, { useState } from "react";
import { Layout, Input, Popover } from "antd";
import {
  GlobalOutlined,
  InboxOutlined,
  MinusSquareOutlined,
  UserOutlined,
  SearchOutlined,
  ProfileOutlined,
  SnippetsOutlined,
  DesktopOutlined,
  BookOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "../../selector";

import actions from "../../actions";

import Tote from "../../pages/Tote";
import Shelf from "../../pages/Shelf";
import Location from "../../pages/Location";

import "./index.scss";

const { Header, Content, Sider } = Layout;

export default function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  const dispatch = useDispatch();

  const authSelect = useSelector(authSelector);

  const arrayMenu = [
    {
      title: "Totes",
      path: "/",
      icon: InboxOutlined,
      children: [
        {
          title: "child menu tote 1",
        },
        {
          title: "child menu tote 1",
        },
        {
          title: "child menu tote 1",
        },
      ],
    },
    {
      title: "Kệ",
      path: "/shelf",
      icon: MinusSquareOutlined,
    },
    {
      title: "Location",
      path: "/location",
      icon: GlobalOutlined,
    },
    {
      title: "Product Brand",
      path: "/location",
      icon: ProfileOutlined,
    },
    {
      title: "Product Category",
      path: "/location",
      icon: SnippetsOutlined,
    },
    {
      title: "Product",
      path: "/location",
      icon: DesktopOutlined,
    },
    {
      title: "Zones",
      path: "/location",
      icon: BookOutlined,
    },
  ];
  const currentMenuActive = arrayMenu[activeMenu];

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => dispatch(actions.auth.logoutAction());

  const content = (
    <div>
      <div onClick={logout} className="flex items-center cursor-pointer">
        <ExportOutlined className=" mr-4" />
        Logout
      </div>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <img
          src={
            "https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png"
          }
          alt="Logo"
          className="main-logo"
        />
        {!collapsed && <span className="text-white">Next Inventory</span>}
        <div className="main-menu-container">
          {arrayMenu?.map((item, index) => {
            const isActive = activeMenu === index;
            const Icon = item.icon;
            return (
              <Link
                onClick={() => setActiveMenu(index)}
                to={item.path}
                className={`${isActive ? "bg-sky-600 shadow-md " : ""} ${
                  collapsed ? "menu-item-mini pl-4" : " px-4 menu-item"
                } flex mb-4  max-w-xs hover:bg-sky-700 items-center gap-4 text-sm text-gray-700 font-light py-3 rounded-lg bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white `}
                href="#/"
                aria-current="page"
              >
                <Icon className={"icon-menu"} />
                <span className="truncate text-menu">
                  {!collapsed && item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </Sider>
      <Layout className="site-layout m-4">
        <Header
          style={{ backgroundColor: "#fff" }}
          className="border-b bg-white mb-4 flex justify-between items-center rounded"
        >
          <div className="flex justify-start items-center">
            <currentMenuActive.icon className={"icon-menu"} />
            <h6 className="uppercase  tracking-wider mt-2">
              {currentMenuActive.title}
            </h6>
          </div>

          <div className="flex justify-start items-center cursor-pointer hover:bg-gray-100 h-6 pl-4 py-4 rounded">
            <Input
              className="rounded-md mr-6"
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 200, borderRadius: 15 }}
            />
            <Popover
              placement="bottom"
              title={""}
              content={content}
              trigger="hover"
            >
              <UserOutlined className="mr-4" />
              {authSelect?.[0]?.username}
            </Popover>
          </div>
        </Header>
        <Content>
          <div
            className="site-layout-background rounded"
            style={{ padding: 24, minHeight: "calc(100vh - 128px)" }}
          >
            <Routes>
              <Route exact path="/" element={<Tote />} />
              <Route path="shelf" element={<Shelf />} />
              <Route path="location" element={<Location />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
