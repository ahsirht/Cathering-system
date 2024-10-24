import React, { useState } from "react"
import { Form, Input, Button, Select, notification } from "antd"
import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database"
import { useNavigate } from "react-router-dom"

const { Option } = Select

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBkLYGrfE-Vk2s1sTJ76b2-dnVaSwKkcZs",
  authDomain: "catering-management-a6ecd.firebaseapp.com",
  projectId: "catering-management-a6ecd",
  storageBucket: "catering-management-a6ecd.appspot.com",
  messagingSenderId: "35759549611",
  appId: "1:35759549611:web:d73c18a3bef68d49bb5bee"
}

// Initialize Firebase only if not already initialized
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp() // Safely get the existing app instance
}

const auth = getAuth(app)
const database = getDatabase(app)

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    const { email, password, name, phoneNumber, userType } = values

    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      await set(ref(database, "users/" + user.uid), {
        username: name,
        email: email,
        phoneNumber: phoneNumber,
        userType: userType // Store user type in the database
      })
      notification.success({ message: "Sign-up successful! User data saved." })
      navigate("/")
    } catch (error) {
      console.error("Error signing up:", error)
      notification.error({
        message: error.message || "Error signing up. Please try again."
      })
    } finally {
      setLoading(false)
    }
  }

  const SignInLink = () => (
    <div
      style={{
        textAlign: "center",
        fontSize: "1.5rem",
        color: "#4096ff",
        margin: "20px 0"
      }}
    >
      <Button type="link" size="large" onClick={() => navigate("/")}>
        Sign In?
      </Button>
    </div>
  )

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Sign Up</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your phone number!" }
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          label="User Type"
          name="userType"
          rules={[{ required: true, message: "Please select a user type!" }]}
        >
          <Select placeholder="Select user type">
            <Option value="Admin">Admin</Option>
            <Option value="Service Seeker">Service Seeker</Option>
            <Option value="Service Provider">Service Provider</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <SignInLink />
    </div>
  )
}

export default SignUp
