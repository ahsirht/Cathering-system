import React, { useEffect, useState } from "react"
import { Table, Spin, notification, Modal, Input, Button, Tag } from "antd"
import { ref, onValue, update } from "firebase/database"
import { secondaryDb } from "../admin-page/firebaseConfig"

const Payments = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [discountPercentage, setDiscountPercentage] = useState("")

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

  // Show the discount modal
  const showDiscountModal = (service) => {
    setSelectedService(service)
    setIsModalVisible(true)
  }

  // Handle applying the discount
  const handleApplyDiscount = async () => {
    if (
      !discountPercentage ||
      isNaN(discountPercentage) ||
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      notification.error({
        message: "Please enter a valid discount percentage between 0 and 100"
      })
      return
    }

    const discountedAmount =
      selectedService.totalAmount * (1 - discountPercentage / 100)
    const serviceRef = ref(secondaryDb, `/service/${selectedService.id}`)

    try {
      // Update the total amount in Firebase
      await update(serviceRef, { totalAmount: discountedAmount })
      notification.success({ message: "Discount applied successfully!" })
      setIsModalVisible(false)
      setDiscountPercentage("")
    } catch (error) {
      notification.error({
        message: `Error applying discount: ${error.message}`
      })
    }
  }

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
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button type="link" onClick={() => showDiscountModal(record)}>
          Apply Discount
        </Button>
      )
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

      {/* Modal for discount */}
      <Modal
        title="Apply Discount"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleApplyDiscount}
        okText="Apply"
        centered
      >
        <Input
          type="number"
          placeholder="Enter discount percentage"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default Payments
