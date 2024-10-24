import { Input } from "antd"
import React from "react"
import passwordIcon from "./passwordIcon"

const InputPassword = (props) => {
  const { ...rest } = props ?? {}
  return (
    <Input.Password
      onPaste={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      iconRender={passwordIcon}
      {...rest}
    />
  )
}

export default InputPassword
