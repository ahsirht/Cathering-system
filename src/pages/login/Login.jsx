import { Link } from "react-router-dom"
import bookKeep from "../../assets/images.png"
import "../../scss/login.css"
import cateringImage from "../../assets/cattering.png"
import LoginForm from "./LoginForm"
import React from "react"

const Login = () => {
  return (
    <div id="login" className="login">
      <div className="left-wrapper">
        <InstagramImg />
        <h3 className="text-slate-700" style={{ fontSize: "50px" }}>
          Catering Management System
        </h3>
        <img src={bookKeep} alt="book-keep-img" className="login-image" />
      </div>
      <div className="right-wrapper">
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login

export const InstagramImg = () => (
  <Link to="/" onClick={(e) => e.preventDefault()}>
    <img
      src={cateringImage}
      alt="Instagram Logo"
      style={{ marginLeft: "-10px", width: "200px", height: "200px" }}
      className="login-branding"
    />
  </Link>
)
