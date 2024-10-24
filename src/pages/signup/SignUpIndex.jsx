import React from "react"
import { InstagramImg } from "../login/Login"
import bookKeep from "../../assets/imaged-removebg-preview.png"
import SignUp from "./SignUp"

const SignUpIndex = () => {
  return (
    <div id="login" className="login">
      <div className="left-wrapper">
        <InstagramImg />
        <h3 className="text-slate-700" style={{ fontSize: "50px" }}>
          Cathering service
        </h3>
        <img src={bookKeep} alt="book-keep-img" className="login-image" />
      </div>
      <div className="right-wrapper">
        <div>
          <SignUp />
        </div>
      </div>
    </div>
  )
}

export default SignUpIndex
