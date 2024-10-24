// src/firebase.js
import { initializeApp, getApps } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDMlTrY4ZHvAVVXCbbFUruaTJWb4Moi_E4",
  authDomain: "insta-realtime-db.firebaseapp.com",
  projectId: "insta-realtime-db",
  storageBucket: "insta-realtime-db.appspot.com",
  messagingSenderId: "858579017981",
  appId: "1:858579017981:web:0c6071cd3c64c6171bde94"
}

// Initialize Firebase only if it hasn't been initialized already
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0] // Use the existing app
}

// Initialize and export the Realtime Database
const database = getDatabase(app)

export { database }
