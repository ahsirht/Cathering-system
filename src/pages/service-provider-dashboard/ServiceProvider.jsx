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
import Menu from "./Menu"

const { Step } = Steps

const ServiceProvider = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [step, setStep] = useState(0) // 0 for Service Seeker, 1 for Admin
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

    const recipient = step === 0 ? "serviceSeeker" : "admin"
    const messageRef = ref(secondaryDb, `/message`)

    try {
      await push(messageRef, {
        content: messageInput,
        timestamp: new Date().toISOString(),
        sender: "serviceProvider",
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
      (msg.recipient === (step === 0 ? "serviceSeeker" : "admin") &&
        msg.sender === "serviceProvider") ||
      (msg.sender === (step === 0 ? "serviceSeeker" : "admin") &&
        msg.recipient === "serviceProvider")
  )

  const items = [
    {
      key: "1",
      label: "Menu",
      children: <Menu />
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
        <h2>Service Provider Dashboard</h2>
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
          <Step title="Service Seeker" />
          <Step title="Admin" />
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
                    item.sender === "serviceProvider"
                      ? "flex-end"
                      : "flex-start"
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar>
                      {item.sender === "serviceProvider"
                        ? "P"
                        : item.sender === "admin"
                        ? "A"
                        : "S"}
                    </Avatar>
                  }
                  description={item.content}
                  style={{
                    textAlign:
                      item.sender === "serviceProvider" ? "right" : "left",
                    backgroundColor:
                      item.sender === "serviceProvider" ? "#e6f7ff" : "#fffbe6",
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

export default ServiceProvider
