import React, { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database" // Firebase functions to fetch data
import { database } from "../../hooks/firebase" // Import Firebase instance
import BottomNav from "./BottomNav"
import UploadPostModal from "./UploadPostModal"
import ImageGallery from "./ImageGallery"

const PostSection = () => {
  const [visible, setVisible] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    const imagesRef = ref(database, "images") // Reference to 'images' node in the database
    // Listen for changes in the database and fetch all images
    onValue(imagesRef, (snapshot) => {
      const data = snapshot.val()
      console.log(imagesRef, data)
      if (data) {
        const fetchedImages = Object.keys(data).map((key) => ({
          id: key,
          url: `data:image/jpeg;base64,${data[key]}` // Convert base64 to image URL format
        }))
        setImages(fetchedImages) // Store images in the state
      }
    })
  }, [])

  const handleUpload = (newImage) => {
    setImages((prevImages) => [
      ...prevImages,
      {
        id: prevImages.length + 1,
        url: `data:image/jpeg;base64,${newImage}`
      }
    ])
  }

  return (
    <div>
      <ImageGallery images={images} />
      <BottomNav setVisible={setVisible} />
      {visible && (
        <UploadPostModal
          open={visible}
          close={() => setVisible(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  )
}

export default PostSection
