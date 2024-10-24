import React, { useState, useEffect } from "react"
import {
  Button,
  Drawer,
  Input,
  Steps,
  Form,
  notification,
  List,
  Avatar,
  Tabs
} from "antd"
import { ref, push, onValue } from "firebase/database"
import { secondaryDb } from "../admin-page/firebaseConfig"
import Payments from "./Payments"
import ServicePage from "./ServicePage"

const { Step } = Steps

const ServiceSeeker = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [step, setStep] = useState(0) // 0 for Admin, 1 for Service Provider
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [loading, setLoading] = useState(true)

  // Open the drawer
  const showDrawer = () => {
    setIsDrawerVisible(true)
  }

  // Close the drawer
  const onClose = () => {
    setIsDrawerVisible(false)
  }

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!messageInput.trim()) {
      notification.error({ message: "Message cannot be empty" })
      return
    }

    const recipient = step === 0 ? "admin" : "serviceProvider"
    const messageRef = ref(secondaryDb, `/message`)

    try {
      await push(messageRef, {
        content: messageInput,
        timestamp: new Date().toISOString(),
        sender: "serviceSeeker",
        recipient: recipient // Set recipient for filtering
      })

      setMessageInput("")
      notification.success({ message: "Message sent!" })
    } catch (error) {
      notification.error({ message: `Error sending message: ${error.message}` })
    }
  }

  // Fetch messages from Firebase
  useEffect(() => {
    const messageRef = ref(secondaryDb, "/message")
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val()
      const messagesList = []

      if (data) {
        Object.keys(data).forEach((key) => {
          messagesList.push({
            id: key,
            ...data[key]
          })
        })
      }

      setMessages(
        messagesList.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      )
      setLoading(false)
    })
  }, [])

  // Filter messages based on the selected step and recipient
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.recipient === (step === 0 ? "admin" : "serviceProvider") &&
        msg.sender === "serviceSeeker") ||
      (msg.sender === (step === 0 ? "admin" : "serviceProvider") &&
        msg.recipient === "serviceSeeker")
  )

  const items = [
    {
      key: "1",
      label: "Menu",
      children: <ServicePage />
    },
    {
      key: "2",
      label: "Payments",
      children: <Payments />
    }
  ]

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2>Service Seeker Dashboard</h2>
        <Button type="primary" onClick={showDrawer}>
          Message
        </Button>
      </div>

      <Tabs items={items} className="gal-tab" style={{ height: "100vh" }} />

      {/* Drawer for messaging */}
      <Drawer
        title="Chat"
        placement="right"
        onClose={onClose}
        visible={isDrawerVisible}
        width={"40%"}
      >
        <Steps current={step} onChange={setStep}>
          <Step title="Admin" />
          <Step title="Service Provider" />
        </Steps>

        <div
          style={{ margin: "20px 0", maxHeight: "300px", overflowY: "auto" }}
        >
          <List
            dataSource={filteredMessages}
            loading={loading}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                style={{
                  justifyContent:
                    item.sender === "serviceSeeker" ? "flex-end" : "flex-start"
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar>
                      {item.sender === "serviceSeeker"
                        ? "S"
                        : item.sender === "admin"
                        ? "A"
                        : "P"}
                    </Avatar>
                  }
                  description={item.content}
                  style={{
                    textAlign:
                      item.sender === "serviceSeeker" ? "right" : "left",
                    backgroundColor:
                      item.sender === "serviceSeeker" ? "#e6f7ff" : "#fffbe6",
                    padding: "10px",
                    borderRadius: "10px"
                  }}
                />
              </List.Item>
            )}
          />
        </div>

        {/* Message input form */}
        <Form
          layout="inline"
          onFinish={handleSendMessage}
          style={{
            position: "absolute",
            bottom: 10,
            width: "97%",
            marginRight: "10px"
          }}
        >
          <Form.Item style={{ flexGrow: 1 }}>
            <Input
              placeholder="Type a message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default ServiceSeeker
