const functions = require("firebase-functions")
const admin = require("firebase-admin")
const cors = require("cors")({ origin: true })

admin.initializeApp()
const storage = admin.storage()

exports.uploadImage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { file, name, contentType } = req.body // Receive file, name, and contentType from the request
    try {
      const bucket = storage.bucket()
      const fileRef = bucket.file(`images/${name}`)
      const buffer = Buffer.from(file, "base64") // Assuming file is sent as base64 string
      await fileRef.save(buffer, { contentType })
      const publicUrl = await fileRef.getSignedUrl({
        action: "read",
        expires: "03-09-2491"
      })
      res.status(200).send({ url: publicUrl[0] })
    } catch (error) {
      res.status(500).send(error.toString())
    }
  })
})
