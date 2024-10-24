import { Button, Form, Input, notification } from "antd"
import InputPassword from "../../custom-components/InputPassword"
import { initializeApp, getApp, getApps } from "firebase/app" // Ensure proper app initialization
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, get } from "firebase/database" // Import database methods
import { useNavigate } from "react-router-dom"
import React from "react"

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
const database = getDatabase(app) // Initialize the database

const LoginForm = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { email, password } = values
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Fetch userType from Firebase Realtime Database
      const userRef = ref(database, `users/${user.uid}/userType`)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userType = snapshot.val()

        // Navigate based on userType
        if (userType === "Admin") {
          navigate("/admin-dashboard")
        } else if (userType === "Service Seeker") {
          navigate("/service-seeker-dashboard")
        } else if (userType === "Service Provider") {
          navigate("/service-provider-dashboard")
        } else {
          notification.error({
            message: "Unknown user type, unable to navigate!"
          })
        }
        notification.success({ message: "Successfully signed in!" })
      } else {
        notification.error({ message: "User type not found!" })
      }
    } catch (error) {
      notification.error({ message: error.message })
      console.error("Error signing in:", error.message)
    }
  }

  const emailValidator = (_, value) => {
    if (!value) return Promise.reject("Please enter email ID")
    if (!isValidEmail(value))
      return Promise.reject("Please enter a valid email ID")
    return Promise.resolve()
  }

  const SignUpLink = () => (
    <div
      style={{
        textAlign: "center",
        fontSize: "1.5rem",
        color: "#4096ff",
        margin: "20px 0"
      }}
    >
      <Button type="link" size="large" onClick={() => navigate("sign-up")}>
        Sign Up?
      </Button>
    </div>
  )

  return (
    <>
      <h2
        className="text-slate-700 login-title text-center mt-4 font-medium"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Sign In
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        name="user"
        size="large"
      >
        <Form.Item
          validateTrigger={["onSubmit"]}
          rules={[{ required: true, type: "email", validator: emailValidator }]}
          name="email"
        >
          <Input autoFocus placeholder="Email" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please enter your password" }]}
          name="password"
        >
          <InputPassword placeholder="Password" />
        </Form.Item>
        <Button
          id="login-sign-in"
          htmlType="submit"
          type="primary"
          block
          className="mt-3"
        >
          Sign in
        </Button>
      </Form>
      <SignUpLink />
    </>
  )
}

export default LoginForm

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
