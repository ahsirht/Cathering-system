import React, { useState, useEffect } from "react"
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Select,
  DatePicker
} from "antd"
import { ref, onValue, push, update } from "firebase/database"
import moment from "moment"
import { secondaryDb } from "../admin-page/firebaseConfig"

const { Option } = Select

const ServicePage = () => {
  const [services, setServices] = useState([])
  const [users, setUsers] = useState([])
  const [menuItems, setMenuItems] = useState([]) // Menu items state
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const [currentServiceId, setCurrentServiceId] = useState(null)
  const [originalUsers, setOriginalUsers] = useState([]) // To store the original users
  const [totalAmount, setTotalAmount] = useState(0) // State to hold total amount

  // Fetch services from Firebase
  useEffect(() => {
    const serviceRef = ref(secondaryDb, "/service")
    onValue(serviceRef, (snapshot) => {
      const data = snapshot.val()
      const serviceList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            userCount: data[key].users ? data[key].users.length : 0
          }))
        : []
      setServices(serviceList)
      setLoading(false)
    })
  }, [])

  // Fetch users from Firebase for the select dropdown
  useEffect(() => {
    const usersRef = ref(secondaryDb, "/Users")
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      const userList = data
        ? Object.keys(data).map((key) => ({
            label: data[key].name,
            value: key, // Use userId (Firebase generated ID) as the value
            isInService: data[key].isInService || false
          }))
        : []
      setUsers(userList)
    })
  }, [])

  // Fetch menu items from Firebase for the menu dropdown
  useEffect(() => {
    const menuRef = ref(secondaryDb, "/menu")
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val()
      const menuList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
            price: parseFloat(data[key].price) // Convert price to number
          }))
        : []
      setMenuItems(menuList)
    })
  }, [])

  // Calculate total amount when menu items are selected
  const handleMenuChange = (selectedMenus) => {
    const selectedMenuItems = menuItems.filter((item) =>
      selectedMenus.includes(item.id)
    )
    const total = selectedMenuItems.reduce((acc, item) => acc + item.price, 0)
    setTotalAmount(total)
  }

  // Function to determine the status based on the service date
  const getStatus = (serviceDate) => {
    const today = moment().startOf("day")
    const serviceMoment = moment(serviceDate).startOf("day")

    if (!serviceDate) return "Unknown"
    if (serviceMoment.isAfter(today)) return "Not Started"
    if (serviceMoment.isSame(today)) return "In Progress"
    if (serviceMoment.isBefore(today)) return "Completed"
    return "Unknown"
  }

  // Function to handle adding a new service or editing an existing one
  const handleAddOrEditService = async (values) => {
    const serviceRef = ref(
      secondaryDb,
      `/service/${isEditing ? currentServiceId : ""}`
    )

    const selectedMenuItems = menuItems.filter((menu) =>
      values.menuList.includes(menu.id)
    )
    const totalAmount = selectedMenuItems.reduce(
      (acc, menu) => acc + menu.price,
      0
    )

    const serviceData = {
      name: values.name,
      description: values.description,
      users: values.users || [], // User IDs
      serviceDate: values.serviceDate.format("YYYY-MM-DD"),
      status: getStatus(values.serviceDate.format("YYYY-MM-DD")),
      menuList: selectedMenuItems,
      totalAmount: totalAmount,
      isPaid: false
    }

    try {
      if (isEditing) {
        // Get the users that were removed from the service
        const removedUsers = originalUsers.filter(
          (userId) => !serviceData.users.includes(userId)
        )

        // Update isInService to false for removed users
        for (let userId of removedUsers) {
          const userRef = ref(secondaryDb, `/users/${userId}`)
          await update(userRef, { isInService: false })
        }

        // Update existing service
        await update(serviceRef, serviceData)
        notification.success({ message: "Service updated successfully!" })
      } else {
        // Add a new service
        await push(ref(secondaryDb, "/service"), serviceData)
        notification.success({ message: "Service added successfully!" })
      }

      // Update each user's isInService field to true if they are added to the service
      for (let userId of serviceData.users) {
        const userRef = ref(secondaryDb, `/users/${userId}`)
        await update(userRef, { isInService: true }) // Update isInService to true for each user
      }

      form.resetFields() // Clear form fields after successful add or edit
      setIsModalVisible(false)
      setIsEditing(false)
      setTotalAmount(0)
      setCurrentServiceId(null)
      setOriginalUsers([]) // Clear original users
    } catch (error) {
      notification.error({ message: "Error saving service!" })
    }
  }

  // Function to edit a service
  const handleEdit = (service) => {
    setCurrentServiceId(service.id)
    form.setFieldsValue({
      name: service.name,
      description: service.description,
      users: service.users, // User IDs
      serviceDate: moment(service.serviceDate),
      menuList: service.menuList.map((menu) => menu.id) // Pre-select menu items
    })
    setOriginalUsers(service.users || []) // Store the original users
    setIsEditing(true)
    setIsModalVisible(true)
  }

  // Function to update the status of the service
  const handleStatusChange = async (serviceId, status) => {
    const serviceRef = ref(secondaryDb, `/service/${serviceId}`)
    try {
      await update(serviceRef, { status })
      notification.success({ message: `Service status updated to ${status}!` })
    } catch (error) {
      notification.error({ message: `Error updating status: ${error.message}` })
    }
  }

  // Function to reset form and open modal for adding a new service
  const handleAddService = () => {
    form.resetFields() // Reset the form fields when switching to "Add" mode
    setIsEditing(false)
    setCurrentServiceId(null)
    setIsModalVisible(true)
  }

  // Function to cancel a service
  const handleCancelService = async (serviceId) => {
    const serviceRef = ref(secondaryDb, `/service/${serviceId}`)
    try {
      await update(serviceRef, { status: "Canceled" })
      notification.success({ message: "Service canceled successfully!" })
    } catch (error) {
      notification.error({
        message: `Error canceling service: ${error.message}`
      })
    }
  }

  // Columns for the Ant Design Table
  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center"
    },
    {
      title: "User Count",
      dataIndex: "userCount",
      key: "userCount",
      align: "center"
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "center",
      render: (amount) => `$${amount ? amount.toFixed(2) : "0.00"}` // Format the amount
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center"
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            type="link"
            danger
            onClick={() => handleCancelService(record.id)}
            disabled={
              record.status === "Canceled" || record.status === "Not Started"
            }
          >
            Cancel
          </Button>
          <Button
            type="link"
            onClick={() => handleStatusChange(record.id, "Not Started")}
            disabled={
              record.status === "Canceled" || record.status === "Not Started"
            }
          >
            Accept
          </Button>
        </>
      )
    }
  ]

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Service Page</h2>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="id"
        loading={loading}
        style={{ marginTop: "20px" }}
      />

      <Modal
        title={isEditing ? "Edit Service" : "Add New Service"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setTotalAmount(0)

          form.resetFields() // Clear the form when closing the modal
        }}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrEditService}>
          <Form.Item
            label="Service Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the service name" }
            ]}
          >
            <Input placeholder="Service Name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" }
            ]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item
            label="Service Date"
            name="serviceDate"
            rules={[
              { required: true, message: "Please select the service date" }
            ]}
          >
            <DatePicker placeholder="Select date" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Assign Users"
            name="users"
            rules={[{ required: true, message: "Please select users" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select users"
              options={users.filter((user) => !user.isInService)} // Only show users not in service
            />
          </Form.Item>
          <Form.Item
            label="Select Menu Items"
            name="menuList"
            rules={[{ required: true, message: "Please select menu items" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select menu items"
              onChange={handleMenuChange}
            >
              {menuItems.map((menu) => (
                <Option key={menu.id} value={menu.id}>
                  {menu.name} - ${menu.price.toFixed(2)}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Total Amount">
            <Input value={`$${totalAmount.toFixed(2)}`} readOnly />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? "Update Service" : "Add Service"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ServicePage
