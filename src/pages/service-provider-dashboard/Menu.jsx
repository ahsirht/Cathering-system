import React, { useState, useEffect } from "react"
import { Row, Col, Card, Spin, notification } from "antd"
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL
} from "firebase/storage"
import { ref as dbRef, get } from "firebase/database"
import { storage, secondaryDb } from "../admin-page/firebaseConfig" // Ensure Firebase is initialized correctly

const { Meta } = Card

const Menu = () => {
  const [images, setImages] = useState([]) // To store image URLs from Firebase Storage
  const [menus, setMenus] = useState([]) // To store menu items (name, description, price) from Firebase Database
  const [loading, setLoading] = useState(true) // Loading state
  // Fetch image URLs from Firebase Storage
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // const storage = getStorage() // Get Firebase Storage instance
        const rootRef = storageRef(storage) // Reference to the root of the storage bucket

        // List all images in the root of the storage
        const result = await listAll(rootRef)

        // Fetch download URLs for all images
        const imageUrls = await Promise.all(
          result.items.map((item) => getDownloadURL(item))
        )

        setImages(imageUrls) // Set the image URLs in state
      } catch (error) {
        notification.error({
          message: `Error loading menu images: ${error.message}`
        })
        setLoading(false)
      }
    }

    const fetchMenuDetails = async () => {
      try {
        const menuRef = dbRef(secondaryDb, `/menu`) // Reference to menu items in Firebase Realtime Database
        const snapshot = await get(menuRef)

        if (snapshot.exists()) {
          setMenus(Object.values(snapshot.val())) // Set the menu items in state
        } else {
          notification.error({ message: "No menu details found!" })
        }
        setLoading(false)
      } catch (error) {
        notification.error({
          message: `Error loading menu details: ${error.message}`
        })
        setLoading(false)
      }
    }

    // Fetch both images and menu details when component mounts
    fetchImages()
    fetchMenuDetails()
  }, [])

  return (
    <Spin spinning={loading}>
      <div style={{ padding: "20px" }}>
        <h2>Catering Menu</h2>
        <Row gutter={[16, 16]}>
          {menus.map((menu, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                cover={
                  images[index] ? (
                    <img
                      alt={menu.name}
                      src={images[index]} // Display the image corresponding to menu index
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "200px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      No Image Available
                    </div>
                  )
                }
              >
                <Meta title={menu.name} description={`Price: $${menu.price}`} />
                <p>{menu.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Spin>
  )
}

export default Menu
