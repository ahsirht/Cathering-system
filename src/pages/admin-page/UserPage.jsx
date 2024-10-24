import React, { useEffect, useState } from "react"
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  notification,
  Select
} from "antd"
import { ref, set, push, onValue, remove, update } from "firebase/database" // Firebase Realtime Database API
import { secondaryDb } from "./firebaseConfig" // Import the db instance
import { PlusOutlined } from "@ant-design/icons"

const { Option } = Select

const UserPage = () => {
  const [users, setUsers] = useState([]) // State to store fetched users
  const [loading, setLoading] = useState(false) // Loading state for table
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal visibility state
  const [editingUser, setEditingUser] = useState(null) // State to store the currently edited user
  const [form] = Form.useForm() // Form instance
  // Fetch Users from Realtime Database
  const fetchUsers = () => {
    setLoading(true) // Set loading state while fetching data
    const usersRef = ref(secondaryDb, "users") // Reference to "users" path in Realtime Database
    onValue(
      usersRef,
      (snapshot) => {
        const data = snapshot.val() // Get the users data snapshot
        if (data) {
          const userList = Object.keys(data).map((key) => ({
            id: key, // Firebase generated ID
            ...data[key] // Spread user data (name, email, etc.)
          }))
          setUsers(userList) // Update state with fetched users
        } else {
          setUsers([]) // Clear the users state if no data is returned
        }
        setLoading(false) // Stop loading state after fetching data
      },
      (error) => {
        message.error("Failed to load users: " + error.message) // Handle fetch error
        setLoading(false) // Stop loading in case of error
      }
    )
  }

  // Add or Update a User in Realtime Database
  const handleAddOrUpdateUser = async (values) => {
    try {
      if (editingUser) {
        // Update existing user
        const userRef = ref(secondaryDb, `users/${editingUser.id}`)
        await update(userRef, values)
        notification.success({ message: "User updated successfully!" })
      } else {
        // Add a new user with isInService: false
        const usersRef = ref(secondaryDb, "users") // Reference to the "users" node
        const newUserRef = push(usersRef) // Create a new user ID under "users"
        await set(newUserRef, { ...values, isInService: false }) // Set user data with isInService as false
        notification.success({ message: "User added successfully!" })
      }
      fetchUsers() // Fetch updated list of users
      setIsModalOpen(false) // Close modal
      setEditingUser(null) // Clear editing user state after saving
    } catch (error) {
      notification.error({
        message: `Failed to ${editingUser ? "update" : "add"} user`
      })
    }
  }

  // Delete a User from Realtime Database
  const handleDeleteUser = async (userId) => {
    try {
      const userRef = ref(secondaryDb, `users/${userId}`)
      await remove(userRef)
      notification.success({ message: "User deleted successfully!" })
      fetchUsers() // Refresh user list
    } catch (error) {
      notification.error({ message: "Failed to delete user" })
    }
  }

  // Open Modal for Adding a User
  const showModal = () => {
    form.resetFields() // Reset form fields
    setEditingUser(null) // Clear any selected user
    setIsModalOpen(true) // Open modal
  }

  // Open Modal for Editing a User
  const handleEditUser = (user) => {
    form.setFieldsValue(user) // Set form values with the selected user's data
    setEditingUser(user) // Set the user to be edited
    setIsModalOpen(true) // Open modal
  }

  useEffect(() => {
    fetchUsers() // Fetch users on component mount
  }, [])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditUser(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            disabled={record.isInService}
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </>
      )
    }
  ]

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
        >
          Add User
        </Button>
      </div>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
      {isModalOpen && (
        <Modal
          title={editingUser ? "Edit User" : "Add User"} // Change modal title based on the action
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          centered
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{}}
            onFinish={handleAddOrUpdateUser}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Enter user name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input placeholder="Enter user email" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default UserPage
