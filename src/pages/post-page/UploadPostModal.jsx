import React, { useState } from "react"
import { Modal, Upload, Button, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { ref, push } from "firebase/database" // Use push to add data to the database
import { database } from "../../hooks/firebase" // Import Firebase instance

const UploadPostModal = ({ open, close, onUpload }) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (file) {
      setLoading(true)

      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64String = reader.result.split(",")[1] // Extract base64 string from the file

          // Push the base64 image data to Firebase Realtime Database
          const imagesRef = ref(database, "images") // Reference to 'images' node in the database
          await push(imagesRef, base64String) // Push the new image data to the database

          onUpload(base64String) // Trigger callback to parent component
          message.success("Image uploaded successfully!")
          close() // Close the modal
        } catch (error) {
          console.error("Error uploading image:", error)
          message.error("Failed to upload image")
        } finally {
          setLoading(false)
        }
      }

      reader.readAsDataURL(file) // Convert the file to base64 format
    }
  }

  const uploadProps = {
    beforeUpload: (file) => {
      setFile(file)
      return false // Prevent auto-upload
    }
  }

  return (
    <Modal title="Upload Post" open={open} onCancel={close} centered>
      <Upload {...uploadProps} listType="picture-card">
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        loading={loading}
        style={{ marginTop: "1rem" }}
      >
        Submit
      </Button>
    </Modal>
  )
}

export default UploadPostModal
