import React from "react"

const ImageGallery = ({ images }) => {
  const handleLike = (id) => {
    // Like handler can be implemented if needed
  }

  const handleAddComment = (id, comment) => {
    // Comment handler can be implemented if needed
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem"
      }}
    >
      {images.map((image) => (
        <div
          key={image.id}
          style={{
            border: "1px solid #dbdbdb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            width: "380px",
            backgroundColor: "#fafafa",
            marginBottom: "3rem"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem"
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
              {image.username}
            </div>
          </div>

          <img
            src={image.url}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "1rem"
            }}
            alt="Uploaded"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem"
            }}
          >
            <button
              onClick={() => handleLike(image.id)}
              style={{
                backgroundColor: "#389710",
                color: "white",
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Like ({image.likes})
            </button>

            <button
              onClick={() => handleAddComment(image.id, "Nice picture!")}
              style={{
                backgroundColor: "#8e8e8e",
                color: "white",
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
