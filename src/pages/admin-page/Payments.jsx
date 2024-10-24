import React, { useEffect, useState } from "react"
import { Table, Spin, notification } from "antd"
import { ref, onValue } from "firebase/database"
import { secondaryDb } from "./firebaseConfig"
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

  // Define table columns
  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      align: "left"
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
    }
  ]

  return (
    <div>
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
