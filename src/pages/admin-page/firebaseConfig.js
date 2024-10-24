import { initializeApp, getApps, getApp } from "firebase/app"
import { getDatabase } from "firebase/database" // Import Realtime Database
import { getStorage } from "firebase/storage"

const secondaryFirebaseConfig = {
  apiKey: "AIzaSyCwmhaV-lcwJH80l2gZfZyDETuFLQlFuBw",
  authDomain: "catering-management-syst-2450c.firebaseapp.com",
  databaseURL:
    "https://catering-management-syst-2450c-default-rtdb.firebaseio.com",
  projectId: "catering-management-syst-2450c",
  storageBucket: "catering-management-syst-2450c.appspot.com",
  messagingSenderId: "52785450117",
  appId: "1:52785450117:web:918057b05c194022916dec"
}

// Check if the secondary app is already initialized
let secondaryApp
if (!getApps().some((app) => app.name === "SecondaryApp")) {
  secondaryApp = initializeApp(secondaryFirebaseConfig, "SecondaryApp") // Initialize a new app with a unique name
} else {
  secondaryApp = getApp("SecondaryApp") // Reuse the secondary app if already initialized
}

// Initialize the Realtime Database for the secondary app and export it
const secondaryDb = getDatabase(secondaryApp)
const storage = getStorage(secondaryApp)

export { secondaryDb, storage }
