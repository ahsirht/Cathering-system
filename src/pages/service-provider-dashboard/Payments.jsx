import React, { useEffect, useState } from "react"
import { Table, Button, Modal, Spin, notification } from "antd"
import { ref, onValue, update } from "firebase/database"
import { secondaryDb } from "../admin-page/firebaseConfig"
import { Tag } from "antd"

const Payments = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch service data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceRef = ref(secondaryDb, "/service") // Reference to the service node in Firebase
        onValue(serviceRef, (snapshot) => {
          const data = snapshot.val()
          const serviceList = data
            ? Object.keys(data).map((key) => ({
                id: key,
                ...data[key]
              }))
            : []
          setServices(serviceList)
          setLoading(false)
        })
      } catch (error) {
        notification.error({
          message: `Error loading services: ${error.message}`
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle the payment confirmation with Modal.confirm
  const handlePay = (service) => {
    Modal.confirm({
      title: "Confirm Payment",
      content: `Are you sure you want to confirm the payment for ${service.name}?`,
      okText: "Confirm",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          const serviceRef = ref(secondaryDb, `/service/${service.id}`)
          await update(serviceRef, { isPaid: true }) // Update isPaid to true

          notification.success({ message: "Payment completed successfully!" })
        } catch (error) {
          notification.error({
            message: `Error completing payment: ${error.message}`
          })
        }
      }
    })
  }

  // Define table columns
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
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "center",
      render: (amount) => `$${amount ? amount.toFixed(2) : "0.00"}` // Display amount with 2 decimals
    },
    {
      title: "Status",
      dataIndex: "isPaid",
      key: "isPaid",
      align: "center",
      render: (isPaid) => (
        <Tag color={isPaid ? "green" : "red"}>
          {isPaid ? "Completed" : "Not Yet"}
        </Tag>
      ) // Display status based on isPaid field
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          disabled={!!record.isPaid}
          onClick={() => handlePay(record)}
        >
          Pay
        </Button>
      )
    }
  ]

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payments</h2>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={services}
          rowKey="id"
          pagination={false}
        />
      </Spin>
    </div>
  )
}

export default Payments
