import React, { useState } from "react"
import { Menu } from "antd"
import {
  HomeOutlined,
  SearchOutlined,
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined
} from "@ant-design/icons"
import UploadPostModal from "./UploadPostModal"

const BottomNav = ({ setVisible }) => {
  const [current, setCurrent] = useState("home")

  const handleClick = (e) => {
    setCurrent(e.key)
    if (e.key === "reels") return setVisible(true)
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderTop: "1px solid #dcdcdc",
        height: "70px"
      }}
    >
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        theme="light"
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "100%"
        }}
      >
        <Menu.Item
          key="home"
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <HomeOutlined style={{ fontSize: "28px" }} />
        </Menu.Item>
        <Menu.Item
          key="search"
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <SearchOutlined style={{ fontSize: "28px" }} />
        </Menu.Item>
        <Menu.Item
          key="reels"
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <PlusOutlined style={{ fontSize: "28px" }} />
        </Menu.Item>
        <Menu.Item
          key="shop"
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ShoppingOutlined style={{ fontSize: "28px" }} />
        </Menu.Item>
        <Menu.Item
          key="profile"
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <UserOutlined style={{ fontSize: "28px" }} />
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default BottomNav
