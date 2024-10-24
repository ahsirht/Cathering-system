import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import "../scss/password-icon.css"
import React from "react"

const passwordIcon = (visible) => {
  return visible ? (
    <span id="visible-eye">
      <EyeOutlined />
    </span>
  ) : (
    <span id="hidden-eye">
      <EyeInvisibleOutlined />
    </span>
  )
}

export default passwordIcon
